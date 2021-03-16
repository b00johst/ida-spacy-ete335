import os
import uuid

def verify_name(name):
    if len(name) == 0:
        print("Invalid name\nAborting...")
        exit()


template = {
    "title" : "",
    "description" : "",
    "type" : "",
    "location" : "",
    "chapter_id" : "", 
    "next" : "",
    "prev" : "",
    "id" : "",
    "index" : 0
}

def fill_template(chapter_name, task_name, chapter_id):
    template["title"] = task_name
    template["location"] = chapter_name
    template["chapter_id"] = chapter_id
    template["type"] = "task"
    template["id"] = "'" + str(uuid.uuid4()) + "'"

    data = ""
    data += "---\n"
    for key, val in template.items():
       data += "{0}: {1}\n".format(key, val)

    data += "---\n"

    return data

def get_chapter_id(file):
    data = file.readlines()

    for line in data:
        if line.startswith("id:"):
            splitted_line = line.split()
            return splitted_line[1]



print("Chapter name:")
chapter_name = input()

verify_name(chapter_name)


for root, dirs, files in os.walk("."):
    break

if chapter_name not in dirs:
    print("Chapter not found")
    print("Aborting...")
    exit()

print("Chapter found: " + chapter_name)



print("Task name:")
task_name = input()

for root, dirs, files in os.walk(chapter_name):
    if task_name + ".md" in files:
        print("Task already exists")
        print("Aborting...")
        exit()


verify_name(task_name)

print("Generating a task named {0} in the chapter {1}...".format(task_name, chapter_name))

chapter_file = open(chapter_name + ".md")
chapter_id = get_chapter_id(chapter_file)

data = fill_template(chapter_name, task_name, chapter_id)

script_dir = os.path.dirname(os.path.realpath('__file__'))
rel_path = chapter_name
abs_file_path = os.path.join(script_dir, rel_path,task_name + ".md")

print(abs_file_path)
with open(abs_file_path, "w") as f:
    f.write(data)


print("Task generated")

