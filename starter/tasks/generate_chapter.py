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
    "next" : "",
    "prev" : "",
    "id" : ""
}

def fill_template(chapter_title):

    template["title"] = chapter_title
    template["type"] = "chapter"
    template["id"] = "'" + str(uuid.uuid4()) + "'"

    data = ""
    data += "---\n"
    for key, val in template.items():
       data += "{0}: {1}\n".format(key, val)

    data += "---\n"

    return data


print("Chapter name:")
chapter_name = input()

verify_name(chapter_name)


for root, dirs, files in os.walk("."):
    break

if chapter_name in dirs or chapter_name + ".md" in files:
    print("Chapter already exists")
    print("Aborting...")
    exit()


print("Generating a chapter named {0}...".format(chapter_name))

data = fill_template(chapter_name)

script_dir = os.path.dirname(os.path.realpath('__file__'))
abs_file_path = os.path.join(script_dir, chapter_name + ".md")

with open(abs_file_path, "w") as f:
    f.write(data)

os.mkdir(chapter_name)


print("Chapter generated")

