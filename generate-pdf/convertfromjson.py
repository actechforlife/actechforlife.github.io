import pdfkit
from jinja2 import Environment, FileSystemLoader
import os
import json

# Specify the path to wkhtmltopdf executable
wk_path_ubuntu = '/usr/bin/wkhtmltopdf'
wk_path_mac = '/usr/local/bin/wkhtmltopdf'
config = pdfkit.configuration(wkhtmltopdf=wk_path_ubuntu)  # Replace with your actual path

# Load JSON data from the file
resume_path = 'assets/json/resume.json'  # Update this path to the actual location of your resume.json file
with open(resume_path, 'r') as json_file:
    resume_data = json.load(json_file)

# Load Jinja2 template
env = Environment(loader=FileSystemLoader('.'))
template = env.get_template('generate-pdf/resume_template.html')

# Render HTML using the template
html_content = template.render(resume=resume_data)

# Save HTML content to a file
html_file_path = 'generate-pdf/resume_generated.html'
with open(html_file_path, 'w') as html_file:
    html_file.write(html_content)

# Specify CSS styling for the PDF
css_path = 'assets/css/resume.css'  # Update this path to the actual location of your resume.css file
with open(css_path, 'r') as css_file:
    css_style = css_file.read()
  

# Save CSS styling to a file
css_file_path = 'resume_style.css'
with open(css_file_path, 'w') as css_file:
    css_file.write(css_style)

# Convert HTML to PDF
try:
    pdfkit.from_file(html_file_path, 'dr_acquah_resume.pdf', configuration=config, css=css_file_path)
except:
    # print('Error: wkhtmltopdf not found. Please install it.')
    pass
finally:
    print('PDF generated successfully.')
# pdfkit.from_file(html_file_path, 'resume_generated.pdf', configuration=config, css=css_file_path)

    # Clean up temporary HTML file and CSS file
    os.remove(html_file_path)
    os.remove(css_file_path)
