from flask import Flask, render_template
from flask_wtf import Form
from wtforms import SelectField

app = Flask(__name__)

class MyForm(Form):
    phone_number = SelectField('Phone number', choices=[('', None), (1, '1234'), (2, '2345'), (3, '3456')])

@app.route('/')
def index():
    return render_template('index.html', form=MyForm(prefix='field-0-'), template_form=MyForm(prefix='field-_-'))

if __name__ == "__main__":
    app.run(debug=True)