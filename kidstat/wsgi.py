import os
from kidstat.app import create_full_app


os.environ.setdefault('FLASK_SETTINGS', 'production')
app = create_full_app()
