# http://stackoverflow.com/questions/19697846/python-csv-to-json
# modified it only slightly
# auteur: Jasper Lelijveld
# studentnummer: 11401753
# vak: Data Processing

import csv
import json

# input/output files
csvfile = open('Data credit-ratings.csv', 'r')
jsonfile = open('Data credit-ratings.json', 'w')

# define fieldnames
fieldnames = ("Country", "Code", "Data", "Outlook")
reader = csv.DictReader(csvfile, fieldnames)
# for each csv row dump json row
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',')

# close files
csvfile.close()
jsonfile.close()
