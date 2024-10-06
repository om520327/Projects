show databases;
use ClassicModels;
SELECT * from employees;
SELECT officeCode,firstName,lastName FROM `employees` WHERE `jobTitle`="Sales Rep" AND officeCode="2";
DELETE FROM offices WHERE officeCode="8";
UPDATE employees SET reportsTo="1002" WHERE`jobTitle`="Sales Rep" AND officeCode="2";
SELECT customerName,country FROM customers  WHERE customerName LIKE "%Toys%" ORDER BY country ASC LIMIT 2;
SELECT customerName,country FROM customers ORDER BY country ASC LIMIT 10;
SELECT COUNT(*) FROM payments WHERE paymentDate<"2004-10-28";
SELECT COUNT(DISTINCT customerNumber) FROM payments WHERE paymentDate<"2004-10-28";

SELECT * 
FROM customers 
WHERE customerNumber 
IN 
(SELECT DISTINCT customerNumber FROM payments WHERE paymentDate<"2004-10-28");

SELECT customerNumber,COUNT(*)
AS numberOfPayments
FROM payments 
WHERE paymentDate<"2004-10-28" 
GROUP BY customerNumber;

SELECT customerNumber,
SUM(amount) AS totalPayment,
COUNT(*) AS numberOfPayments,
MAX(amount) AS largestPayment,
MIN(amount) AS smallestPayment,
AVG(amount) AS averagePayment
FROM payments 
WHERE paymentDate<"2004-10-28" 
GROUP BY customerNumber;

SELECT productCode,
SUM(quantityOrdered) AS numberOrdered
FROM orderdetails 
GROUP BY productCode;

SELECT customerNumber,
SUM(amount) AS totalPayment
FROM payments 
WHERE paymentDate<"2004-10-28" 
GROUP BY customerNumber
ORDER BY totalPayment DESC
LIMIT 10 OFFSET 5;

SELECT customerName,
UCASE(CONCAT(contactLastName," ", 
contactFirstName)) AS contact,
phone,
country 
FROM customers
WHERE country="USA"
ORDER BY customerName;

SELECT LCASE(SUBSTRING(country,1,3))
AS countryCode
FROM customers ORDER BY customerName
LIMIT 10;

SELECT ROUND(MSRP)
AS salePrice 
FROM products
WHERE productLine="Motorcycles" 
ORDER BY salePrice DESC
LIMIT 5;

SELECT productCode, 
productName, 
buyPrice, 
MSRP, 
ROUND(((MSRP - buyPrice)*100/buyPrice), 2) AS profitMargin 
FROM products 
ORDER BY profitMargin DESC 
LIMIT 10;
    
SELECT customerNumber, 
MAX(amount) AS largestPayment 
FROM payments 
WHERE YEAR(paymentDate)=2004 
GROUP BY customerNumber 
ORDER BY largestPayment DESC;
    
SELECT YEAR(paymentDate) as `year`, 
MONTH(paymentDate) as `month`, 
ROUND(SUM(amount), 2) as `totalPayments`
FROM payments 
GROUP BY `year`, `month` 
ORDER BY `year`, `month`;
    
SELECT YEAR(paymentDate) as `year`, 
DATE_FORMAT(paymentDate,"%b") as `monthName`, 
CONCAT("$",FORMAT(SUM(amount), 2)) as `revenue`
FROM payments 
GROUP BY `year`, MONTH(paymentDate),monthName
ORDER BY `year`, MONTH(paymentDate);

SELECT checkNumber,
paymentDate, amount, customers.customerNumber, customerName, phone 
FROM payments 
JOIN customers 
ON payments.customerNumber=customers.customerNumber
ORDER BY paymentDate DESC
LIMIT 10;

SELECT customers.customerName, orders.orderNumber,customers.customerNumber
FROM Customers
LEFT JOIN Orders
ON customers.customerNumber=orders.customerNumber
ORDER BY customers.customerName;
-- same table join QUESTION: Show a list of employees with the name & employee number of their manager
SELECT E.employeeNumber, 
CONCAT(E.firstName," ", E.lastName) AS employeeName, 
M.employeeNumber AS managerEmployeeNumber, 
CONCAT(M.firstName, " ", M.lastName) AS managerName
FROM employees E LEFT JOIN employees M ON E.reportsTo=M.employeeNumber;


-- QUESTION: Add an index on the lastName column of the customers table.
CREATE INDEX customer_lastname_index ON customers (contactLastName);

-- This index will speed up queries like:

SELECT * FROM customers WHERE contactLastName="Lee";
SELECT * FROM customers ORDER BY contactLastName LIMIT 10;
-- To view the indexes on a table, run:
SHOW INDEX FROM table_name;


-- Views
-- If you perform a query often or frequently join two tables for querying, you can create a virtual table called a "view" to make it easier to write queries.

-- Here's how a view is created:

CREATE VIEW usaCustomers AS SELECT * FROM customers WHERE country='USA';

-- A view can be queried just like a table:
select * from usaCustomers WHERE state="CA";
-- The term usaCustomers is replaced with the query used to create the view.
-- Certain relational databases support creation of materialized views which caches 
-- the result of query that creates the view. This can significantly speed up query execution.