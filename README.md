# Select2 Test

This is a brief guide to set up and run the application.

## Prerequisites

- Python 3.x

## Installation

1. Create a virtual environment:

    ```bash
    python -m venv venv
    ```

2. Activate the virtual environment:

    ```bash
    source venv/bin/activate
    ```

3. Download project dependencies:

    ```bash
    pip install -r requirements.txt
    ```

## Usage

1. Run the application:

    ```bash
    python app.py
    ```

2. Access the application in your web browser:

    Open a web browser and navigate to [localhost:5000/](http://localhost:5000/)


## Issue

When running the application, randomly add and remove fields. Try removing fields from between and then add more. You'll notice that on adding fields, sometimes one of the previously added field loses the select2 functionality.

Screenshots below:

This screenshot shows 2 fields that were added. Both have select2 functionality.


![Screenshot 2023-08-18 at 10 53 43](https://github.com/darkchoc/Select2Testing/assets/19534611/d9798ec1-70b3-4325-9bd7-e8c1d5dbff71)

Upon adding the third field, one of the previously added field loses select2 functionality. 

![Screenshot 2023-08-18 at 10 53 10](https://github.com/darkchoc/Select2Testing/assets/19534611/fdbbf3da-9694-4293-9160-690e15672bf9)

## Findings till now

The issue is not occuring if I assing a monotonically increasing counter as index of the new form. Adjusting indices of already present forms is not causing the issue as long as the new form added has an index that hasn't been used before.

Moreover, I have tried modifying properties such as 'data-select2-id' and 'aria-labelledby' (in updateFormWithNewIndex function of add_remove.js), that I can see in some of the tags. These properties/attributes are derived from id of the field, so I tried to match them to the modified id. But this doesn't solve the problem.

