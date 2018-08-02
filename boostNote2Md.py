#!/usr/bin/env python3
# coding: utf-8
"""
Author       : grandfleet
Created Time : 2018-05-26 21:32:59
Prerequisite:
    python3 -m pip install cson arrow
"""
import json
import os
import sys
import datetime
import cson
try:
    import arrow
    time_aware = True
except ImportError:
    print(
        'warning: datetime information will be discarded unless you install arrow'
    )
    time_aware = False


def read_file(fp):
    with open(fp) as f:
        return f.read()


def text_to_dict(text):
    """convert json or cson to dict"""
    try:
        return cson.loads(text)
    except:
        pass

    try:
        return json.loads(text)
    except:
        pass
    raise Exception("text should be in cson or json format")


def read_folder_names(fp):
    data = text_to_dict(read_file(fp))
    return {x['key']: x['name'] for x in data['folders']}


def write_boostnote_markdown(data, output, folder_map):
    """write boostnote dict to markdown"""
    target_dir = os.path.join(output, folder_map[data['folder']])
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)

    target_file = os.path.join(target_dir, '{}.md'.format(data['title'].replace('/', '-')))
    with open(target_file, 'w') as f:
        # If no data is present, skip the snippets
        try: 
            f.write(data['content'])
            print(target_file)
        # todo, add code to manage snippets
        except:
            print('nothing good')
    
    # Update date of file correctly.
    if time_aware:
        update_at = arrow.get(data['updatedAt'])
        update_at_epoch = int(update_at.timestamp)
        os.utime(target_file, (update_at_epoch, update_at_epoch))
        stat = os.stat(target_file)


def process_file(source, output, folder_map):
    data = text_to_dict(read_file(source))
    write_boostnote_markdown(data, output, folder_map)


def main(boostnote_dir, output):
    """
    :input: input folder path
    :output: output folder path
    """
    folder_map = read_folder_names(os.path.join(boostnote_dir, 'boostnote.json'))
    notes_dir = os.path.join(boostnote_dir, 'notes')
    for name in os.listdir(notes_dir):
        if not name.endswith('.cson'):
            continue

        source = os.path.join(notes_dir, name)
        process_file(source, output, folder_map)


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(
        description="convert boostnote cson format data to markdown")

    parser.add_argument(
        '-s',
        '--source',
        type=str,
        help="directory store the cson files",
        default=".")
    parser.add_argument(
        '-o', '--output', type=str, help="output directory", default="docs")

    args = parser.parse_args()

    main(args.source, args.output)