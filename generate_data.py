import os
import json

indicators_dir = 'indicators'
output_file = 'indicators_data.js'

indicators = []

for filename in os.listdir(indicators_dir):
    if filename.endswith('.pine'):
        with open(os.path.join(indicators_dir, filename), 'r') as f:
            content = f.read()
            # Try to find the name in the first few lines
            name = filename.replace('.pine', '').replace('_', ' ').title()
            for line in content.split('\n')[:10]:
                if 'indicator(' in line:
                    try:
                        name = line.split('"')[1]
                    except:
                        pass
                    break
            indicators.append({
                'id': filename,
                'name': name,
                'code': content
            })

with open(output_file, 'w') as f:
    f.write('export const indicators = ' + json.dumps(indicators, indent=2) + ';')
