import os
import csv
from flask import url_for
from flask_script import Manager, Command, Option
from flask_debugtoolbar import DebugToolbarExtension
import requests
from kidstat import app as app_factory
from kidstat import models


class PopulateStandardsValues(Command):
    percentile_columns = (
        (7, 5),
        (9, 15),
        (10, 25),
        (11, 50),
        (12, 75),
        (13, 85),
        (15, 95),
        (17, 99),
        # (18, 99.9),
    )

    def get_standards_data(self, gender, data_url, parameter):
        response = requests.get(data_url)
        assert response.status_code == 200
        reader = csv.reader(response.text.split('\r\n'), delimiter='\t')

        header = next(reader)
        check = (header[0] == 'Day' or header[0] == 'Age',
                 header[7] == 'P5',
                 header[9] == 'P15',
                 header[10] == 'P25',
                 header[11] == 'P50',
                 header[12] == 'P75',
                 header[13] == 'P85',
                 header[15] == 'P95',
                 header[17] == 'P99')
        if not all(check):
            raise ValueError(
                'Data file structure has changed: {0}'.format(check))

        for row in reader:
            if not row:
                continue
            age = int(row[0])
            for column, percentile in self.percentile_columns:
                standard = models.Standard(age=age,
                                           gender=gender,
                                           percentile=percentile,
                                           parameter=parameter,
                                           value=row[column])
                standard.save()

    def run(self):
        # Standards are overwritten
        models.Standard.objects.delete()
        # Height
        height = models.Parameter.objects.filter(name='height').first()
        if height is None:
            height = models.Parameter(name='height',
                                      description='Body length for age',
                                      unit='cm')
        height.save()
        url_height_boys = \
            'http://www.who.int/childgrowth/standards/lhfa_boys_p_exp.txt'
        self.get_standards_data(models.MALE, url_height_boys, height)

        url_height_girls = \
            'http://www.who.int/childgrowth/standards/lhfa_girls_p_exp.txt'
        self.get_standards_data(models.FEMALE, url_height_girls, height)

        # Weight
        weight = models.Parameter.objects.filter(name='weight').first()
        if weight is None:
            weight = models.Parameter(name='weight',
                                      description='Body weight',
                                      unit='kg')
        weight.save()
        url_weight_boys = \
            'http://www.who.int/childgrowth/standards/wfa_boys_p_exp.txt'
        self.get_standards_data(models.MALE, url_weight_boys, weight)

        url_weight_girls = \
            'http://www.who.int/childgrowth/standards/wfa_girls_p_exp.txt'
        self.get_standards_data(models.MALE, url_weight_girls, weight)


class CreateAdminUser(Command):

    option_list = (
        Option('--email', '-e', dest='email'),
        Option('--password', '-p', dest='password'),
    )

    def run(self, email, password):
        admin_role = models.user_datastore.find_or_create_role(
            models.ADMIN_ROLE)
        admin_user = models.User(email=email)
        admin_user.set_password(password)
        models.user_datastore.add_role_to_user(admin_user, admin_role)
        admin_user.save()


def setup_debug_toolbar(app):
    toolbar = DebugToolbarExtension(app)
    return toolbar

if __name__ == "__main__":
    app = app_factory.create_app()

    @app.context_processor
    def override_url_for():
        return dict(url_for=dated_url_for)

    def dated_url_for(endpoint, **values):
        if endpoint == 'static':
            filename = values.get('filename', None)
            if filename:
                file_path = os.path.join(app.root_path,
                                         endpoint, filename)
                values['q'] = int(os.stat(file_path).st_mtime)
        return url_for(endpoint, **values)

    app_factory.setup_security(app)
    app_factory.setup_admin(app)
    app_factory.setup_api(app)
    setup_debug_toolbar(app)
    manager = Manager(app)
    manager.add_command("createsuperuser", CreateAdminUser())
    manager.add_command('download_standards', PopulateStandardsValues())
    manager.run()
