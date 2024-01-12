import pdfkit
from bs4 import BeautifulSoup

# Specify the path to wkhtmltopdf executable
wk_path = '/usr/local/bin/wkhtmltopdf'
config = pdfkit.configuration(wkhtmltopdf=wk_path)

# Read the HTML file
with open('resume.html', 'r') as file:
    html_content = file.read()

# Parse HTML using BeautifulSoup
soup = BeautifulSoup(html_content, 'html.parser')
main_content = soup.find('main', {'id': 'main'})

# Save extracted content to a new HTML file
with open('extracted_content.html', 'w') as extracted_file:
    extracted_file.write(str(main_content))

# Convert the extracted content to PDF
pdfkit.from_file('extracted_content.html', 'resume.pdf', configuration=config)
