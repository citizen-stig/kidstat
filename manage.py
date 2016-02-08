# -*- encoding: utf-8 -*-
import csv
from flask_script import Manager, Command, Option
from flask_security import MongoEngineUserDatastore
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

    def get_standards_data(self, gender, data_url):
        response = requests.get(data_url)
        assert response.status_code == 200
        standards = []
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
            raise ValueError('Data file structure is changed: {0}'.format(check))

        for row in reader:
            if not row:
                continue
            age = int(row[0])
            for column, percentile in self.percentile_columns:
                standard = models.Standard(age=age,
                                           gender=gender,
                                           percentile=percentile,
                                           value=row[column])
                standards.append(standard)
        return standards

    def run(self):
        # Height
        height = models.Parameter.objects.filter(name='height').first()
        if height is None:
            height = models.Parameter(name='height',
                                      description='Body length for age',
                                      unit='cm')
        # Standards are overwritten
        height.standards = []
        height.save()

        url_height_boys = 'http://www.who.int/childgrowth/standards/lhfa_boys_p_exp.txt'
        height_boys_standards = self.get_standards_data(models.MALE, url_height_boys)
        height.standards += height_boys_standards

        url_height_girls = 'http://www.who.int/childgrowth/standards/lhfa_girls_p_exp.txt'
        height_girls_standards = self.get_standards_data(models.FEMALE, url_height_girls)
        height.standards += height_girls_standards

        height.save()

        # Weight
        weight = models.Parameter.objects.filter(name='weight').first()
        if weight is None:
            weight = models.Parameter(name='weight',
                                      description='Body weight',
                                      unit='kg')
        weight.standards = []
        weight.save()
        url_weight_boys = 'http://www.who.int/childgrowth/standards/wfa_boys_p_exp.txt'
        weight_boys_standards = self.get_standards_data(models.MALE, url_weight_boys)
        weight.standards += weight_boys_standards

        url_weight_girls = 'http://www.who.int/childgrowth/standards/wfa_girls_p_exp.txt'
        weight_girls_standards = self.get_standards_data(models.MALE, url_weight_girls)
        weight.standards += weight_girls_standards

        weight.save()


class CreateAdminUser(Command):

    option_list = (
        Option('--email', '-e', dest='email'),
        Option('--password', '-p', dest='password'),
    )

    def run(self, email, password):
        user_datastore = MongoEngineUserDatastore(models.db, models.User, models.Role)
        admin_role = models.user_datastore.find_or_create_role(models.ADMIN_ROLE)
        admin_user = models.User(email=email)
        admin_user.set_password(password)
        user_datastore.add_role_to_user(admin_user, admin_role)
        admin_user.save()


if __name__ == "__main__":
    app = app_factory.create_app()
    app_factory.setup_security(app)
    app_factory.setup_admin(app)
    app_factory.setup_api(app)
    app_factory.setup_debug_toolbar(app)
    manager = Manager(app)
    manager.add_command("createsuperuser", CreateAdminUser())
    manager.add_command('download_standards', PopulateStandardsValues())
    manager.run()
