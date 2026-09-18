# E-Commerce Customer Intelligence System

## Project Overview

An end-to-end data science project built using the Olist e-commerce dataset to analyze customer behavior, predict churn, estimate customer value, identify repeat-purchase opportunities, generate product recommendations, and explain machine learning predictions.

The project combines data cleaning, data integration, feature engineering, exploratory data analysis, customer segmentation, machine learning, recommendation systems, explainable AI, and an interactive dashboard.

---

## Business Objectives

- Understand customer purchasing behavior
- Build a Customer 360° dataset
- Identify customers at risk of churn
- Analyze customer lifetime value
- Predict repeat-purchase behavior
- Generate personalized product recommendations
- Explain churn predictions using SHAP
- Present insights through an interactive dashboard


## Project Structure

```text
E-Commerce-Customer-Intelligence/
│
├── dashboard/
│   ├── app.py
│   ├── index.html
│   ├── scriptes.js
│   └── style.css
│
├── data/
│   ├── raw/
│   └── processed/
│
├── models/
│
├── notebooks/
│   ├── 01_data_exploration.ipynb
│   ├── 02_data_cleaning.ipynb
│   ├── 03_data_integration.ipynb
│   ├── 04_feature_engineering.ipynb
│   ├── 05_customer_segmentation.ipynb
│   ├── 06_eda_business_insights.ipynb
│   ├── 07_churn_prediction.ipynb
│   ├── 08_CLV_Customer_Value.ipynb
│   ├── 09_Repeat_Purchase_Prediction.ipynb
│   ├── 10_Recommendation_System.ipynb
│   └── 11_Explainable_ML.ipynb
│
├── src/
│
├── .gitignore
└── README.md

## Dataset

The project uses the Brazilian Olist e-commerce dataset.

The dataset contains information about:

Customers
Orders
Order items
Payments
Products
Sellers
Reviews
Product categories
Geolocation

Raw and large processed CSV files are excluded from this GitHub repository using .gitignore.

## Project Pipeline
Raw E-Commerce Data
        ↓
Data Understanding
        ↓
Data Cleaning
        ↓
Data Integration
        ↓
Customer 360° Feature Engineering
        ↓
EDA & Business Insights
        ↓
Customer Segmentation
        ↓
Churn Prediction
        ↓
Customer Lifetime Value
        ↓
Repeat Purchase Prediction
        ↓
Recommendation System
        ↓
Explainable ML
        ↓
Interactive Dashboard

## Customer 360

A customer-level dataset was created by combining information from multiple Olist tables.

The Customer 360° feature set includes information related to:

Order behavior
Spending
Payment behavior
Delivery performance
Reviews
Purchase frequency
Customer recency
Product/category behavior

Final Customer 360° dataset:

Customers: 96,096
Features: 47

## Churn Prediction

Customer churn was modeled using customer-level behavioral features.

Models explored include:

Logistic Regression
Random Forest
Gradient Boosting
Tuned Random Forest

The churn label is a project-defined inactivity/recency proxy rather than an official churn label provided by Olist.

The explainable Logistic Regression model achieved approximately 97.82% validation accuracy.

## Customer Lifetime Value

A historical customer value analysis was performed using customer spending and purchasing behavior.

### Key Results
Total historical customer value: 15,843,553.24
Average customer value: 164.87
Median customer value: 107.27

Customers were divided into four value groups:

Low Value
Medium Value
High Value
Very High Value

The Very High Value group contributed approximately 59.75% of total historical customer value.

Note: This is a historical CLV/value proxy, not a future CLV forecast.


## Repeat Purchase Prediction

A future repeat-purchase target was created using a temporal cutoff of 2018-01-01.

The prediction problem was highly imbalanced:

Observation customers: 44,034
Repeat purchasers: 687
Repeat-purchase rate: approximately 1.56%

Multiple models were evaluated, including:

Logistic Regression
Random Forest
Gradient Boosting

Because of the severe class imbalance, Precision, Recall, F1-score, ROC-AUC and PR-AUC were considered alongside accuracy.

Threshold tuning was also performed.


## Recommendation System

An item-based collaborative filtering approach was implemented using customer-product interaction data.

The final recommendation output contains:

100 customers
5 recommendations per customer
500 recommendation rows
27 unique recommended products
13 product categories

The recommendation system was evaluated using:

Precision@5
Recall@5
Hit Rate@5

The evaluation showed that the recommendation system still has room for improvement, particularly in recommendation diversity and personalization.

## Explainable ML

SHAP was used to understand the behavior of the churn prediction model.

The most influential features by mean absolute SHAP value included:

recency_days
avg_delivery_days
max_delivery_days
avg_payment_value
total_spent
avg_order_value
spend_per_order

SHAP explanations describe model behavior and feature contribution; they should not be interpreted as proof of causation.


## Interactive Dashboard

A dashboard was created using:

HTML
CSS
JavaScript
Chart.js
Papa Parse

The dashboard contains sections for:

Overview
Customer analysis
Churn prediction
Customer value
Recommendations
Explainable ML

## Technologies Used
### Programming
Python
JavaScript
HTML
CSS
### Data Science
Pandas
NumPy
Scikit-learn
SHAP
### Visualization
Matplotlib
Seaborn
Chart.js
### Machine Learning
Logistic Regression
Random Forest
Gradient Boosting
Collaborative Filtering
### Development
Jupyter Notebook
VS Code
Git
GitHub


## Key Learning Areas

This project demonstrates practical experience with:

Data preprocessing
Missing-value handling
Data integration
Feature engineering
Customer analytics
Classification
Imbalanced learning
Model evaluation
Hyperparameter tuning
Recommendation systems
Explainable AI
Business analytics
Dashboard development

## Limitations
The Olist dataset does not provide an official churn label, so churn was defined using a project-specific behavioral rule.
CLV represents historical customer value rather than future predicted lifetime value.
Repeat-purchase prediction is highly imbalanced.
The recommendation system has limited diversity and can recommend popular products repeatedly.
SHAP explains model behavior but does not establish causal relationships.


## Author

Sanju Kumari

GitHub: sanju2027

