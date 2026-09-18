// ==========================================
// KPI CARDS - DYNAMIC DATA
// ==========================================

async function loadKPIs() {

    try {

        // Load CSV files
        const customerResponse = await fetch("../data/processed/customer_360.csv");
        const ordersResponse = await fetch("../data/processed/orders_clean.csv");
        const itemsResponse = await fetch("../data/processed/order_items_clean.csv");

        if (!customerResponse.ok || !ordersResponse.ok || !itemsResponse.ok) {
            throw new Error("Unable to load one or more CSV files.");
        }

        const customerCSV = await customerResponse.text();
        const ordersCSV = await ordersResponse.text();
        const itemsCSV = await itemsResponse.text();

        // Parse CSV files
        const customers = Papa.parse(customerCSV, {
            header: true,
            skipEmptyLines: true
        }).data;

        const orders = Papa.parse(ordersCSV, {
            header: true,
            skipEmptyLines: true
        }).data;

        const orderItems = Papa.parse(itemsCSV, {
            header: true,
            skipEmptyLines: true
        }).data;




// PART2

// ==========================================
// CUSTOMER EXPLORER - DYNAMIC SEARCH
// ==========================================

let customerData = [];


// Load Customer 360 data
async function loadCustomerData() {

    try {

        const response = await fetch(
            "../data/processed/customer_360.csv"
        );

        if (!response.ok) {
            throw new Error("Unable to load customer_360.csv");
        }

        const csvText = await response.text();

        const parsed = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true
        });

        customerData = parsed.data;

        console.log(
            "Customer 360 loaded:",
            customerData.length,
            "customers"
        );

    } catch (error) {

        console.error("Customer data error:", error);

    }
}


// Search customer
document
    .getElementById("searchCustomer")
    .addEventListener("click", function () {

        const customerId =
            document
                .getElementById("customerSearch")
                .value
                .trim();

        const result =
            document.getElementById("customerResult");


        // Empty search
        if (customerId === "") {

            result.innerHTML = `
                <p>Please enter a Customer ID.</p>
            `;

            return;
        }


        // Find customer
        const customer = customerData.find(
            row =>
                row.customer_unique_id === customerId
        );


        // Customer not found
        if (!customer) {

            result.innerHTML = `
                <p>Customer not found.</p>
            `;

            return;
        }


        // Display customer
        result.innerHTML = `

            <div class="customer-profile">

                <h3>Customer Profile</h3>

                <p>
                    Customer ID
                    <strong>
                        ${customer.customer_unique_id}
                    </strong>
                </p>

                <p>
                    Total Orders
                    <strong>
                        ${Number(customer.total_orders || 0).toLocaleString()}
                    </strong>
                </p>

                <p>
                    Total Spent
                    <strong>
                        R$ ${Number(customer.total_spent || 0).toFixed(2)}
                    </strong>
                </p>

                <p>
                    Average Order Value
                    <strong>
                        R$ ${Number(customer.avg_order_value || 0).toFixed(2)}
                    </strong>
                </p>

                <p>
                    Recency
                    <strong>
                        ${Number(customer.recency_days || 0).toFixed(0)} days
                    </strong>
                </p>

                <p>
                    Average Review Score
                    <strong>
                        ${Number(customer.avg_review_score || 0).toFixed(2)}
                    </strong>
                </p>

            </div>

        `;

    });


// Load data when dashboard starts
loadCustomerData();




// PART3 


// ==========================================
// CHURN DISTRIBUTION - DYNAMIC DATA
// ==========================================
// CHURN DISRRIBUTION PART 1 COMMENTED
// async function loadChurnDistribution() {

//     try {

//         const response = await fetch(
//             "../data/processed/customer_churn.csv"
//         );

//         if (!response.ok) {
//             throw new Error("Unable to load customer_churn.csv");
//         }

//         const csvText = await response.text();

//         const data = Papa.parse(csvText, {
//             header: true,
//             skipEmptyLines: true
//         }).data;

//         console.log("Churn data loaded:", data.length);

//         // Find churn column automatically
//         const churnColumn = data.length > 0
//             ? Object.keys(data[0]).find(column =>
//                 column.toLowerCase().includes("churn")
//             )
//             : null;

//         if (!churnColumn) {
//             throw new Error("Churn column not found.");
//         }

//         console.log("Churn column:", churnColumn);

//         // Count churn values
//         let churned = 0;
//         let active = 0;

//         data.forEach(row => {

//             const value = String(row[churnColumn])
//                 .trim()
//                 .toLowerCase();

//             if (
//                 value === "1" ||
//                 value === "true" ||
//                 value === "yes" ||
//                 value === "churned"
//             ) {
//                 churned++;
//             } else {
//                 active++;
//             }

//         });

//         console.log("Active Customers:", active);
//         console.log("Churned Customers:", churned);

//         // Destroy previous chart if it exists
//         if (window.churnChart instanceof Chart) {
//             window.churnChart.destroy();
//         }

//         const ctx = document.getElementById("churnChart");

//         if (!ctx) {
//             throw new Error("churnChart canvas not found.");
//         }

//         window.churnChart = new Chart(ctx, {

//             type: "doughnut",

//             data: {

//                 labels: [
//                     "Active Customers",
//                     "Churned Customers"
//                 ],

//                 datasets: [{

//                     data: [
//                         active,
//                         churned
//                     ],

//                     borderWidth: 1

//                 }]

//             },

//             options: {

//                 responsive: true,

//                 maintainAspectRatio: false,

//                 plugins: {

//                     legend: {
//                         position: "bottom"
//                     }

//                 }

//             }

//         });

//     } catch (error) {

//         console.error(
//             "Churn distribution error:",
//             error
//         );

//     }
// }

// loadChurnDistribution();







        // ------------------------------------------
        // 1. TOTAL CUSTOMERS
        // ------------------------------------------

        const totalCustomers = customers.length;


        // ------------------------------------------
        // 2. TOTAL ORDERS
        // ------------------------------------------

        const totalOrders = orders.length;


        // ------------------------------------------
        // 3. TOTAL REVENUE
        // ------------------------------------------

        const totalRevenue = orderItems.reduce((total, row) => {

            const price = parseFloat(row.price);

            return total + (isNaN(price) ? 0 : price);

        }, 0);


        // ------------------------------------------
        // 4. AVERAGE ORDER VALUE
        // ------------------------------------------

        const averageOrderValue =
            totalOrders > 0
                ? totalRevenue / totalOrders
                : 0;


        // ------------------------------------------
        // DISPLAY VALUES
        // ------------------------------------------

        document.getElementById("totalCustomers").textContent =
            totalCustomers.toLocaleString();

        document.getElementById("totalOrders").textContent =
            totalOrders.toLocaleString();

        document.getElementById("totalRevenue").textContent =
            "R$ " + totalRevenue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

        document.getElementById("averageOrderValue").textContent =
            "R$ " + averageOrderValue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });


        console.log("===== KPI DATA =====");
        console.log("Total Customers:", totalCustomers);
        console.log("Total Orders:", totalOrders);
        console.log("Total Revenue:", totalRevenue);
        console.log("Average Order Value:", averageOrderValue);


    } catch (error) {

        console.error("KPI loading error:", error);

        document.getElementById("totalCustomers").textContent = "Error";
        document.getElementById("totalOrders").textContent = "Error";
        document.getElementById("totalRevenue").textContent = "Error";
        document.getElementById("averageOrderValue").textContent = "Error";
    }
}


// Run KPI function
loadKPIs();



// ==========================================
// CHURN DISTRIBUTION - DYNAMIC
// ==========================================

async function loadChurnDistribution() {

    const explanation = document.getElementById("churnExplanation");

    try {

        explanation.innerHTML = "<p>Loading churn data...</p>";

        const response = await fetch(
            "../data/processed/customer_churn.csv"
        );

        if (!response.ok) {
            throw new Error("customer_churn.csv could not be loaded");
        }

        const csvText = await response.text();

        const result = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true
        });

        const data = result.data;

        let active = 0;
        let churned = 0;

        data.forEach(row => {

            const value = Number(row.churn);

            if (value === 0) {
                active++;
            }

            if (value === 1) {
                churned++;
            }

        });

        console.log("Churn customers:", data.length);
        console.log("Active:", active);
        console.log("Churned:", churned);

        // Show data on dashboard
        explanation.innerHTML = `
            <p>
                <strong>Churn Data Loaded:</strong>
                ${data.length.toLocaleString()} customers
                &nbsp; | &nbsp;
                Active: ${active.toLocaleString()}
                &nbsp; | &nbsp;
                Churned: ${churned.toLocaleString()}
            </p>
        `;

        const canvas = document.getElementById("churnChart");

        if (!canvas) {
            throw new Error("churnChart canvas not found");
        }

        // Remove any existing Chart.js chart attached to this canvas
        const existingChart = Chart.getChart(canvas);

        if (existingChart) {
            existingChart.destroy();
        }

        // Create new chart
        new Chart(canvas, {

            type: "doughnut",

            data: {

                labels: [
                    "Active Customers",
                    "Churned Customers"
                ],

                datasets: [{
                    data: [
                        active,
                        churned
                    ],
                    borderWidth: 1
                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        position: "bottom"
                    }

                }

            }

        });

    } catch (error) {

        console.error("Churn error:", error);

        explanation.innerHTML = `
            <p>
                <strong>Churn Error:</strong>
                ${error.message}
            </p>
        `;

    }

}

loadChurnDistribution();






// PART 4

// ==========================================
// GLOBAL CHURN DRIVERS - SHAP
// ==========================================

async function loadGlobalShap() {

    const container = document.getElementById("churnExplanation");

    try {

        const response = await fetch(
            "../data/processed/shap_feature_importance.csv"
        );

        if (!response.ok) {
            throw new Error("shap_feature_importance.csv could not be loaded");
        }

        const csvText = await response.text();

        const result = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true
        });

        const data = result.data;

        // Sort by mean absolute SHAP value
        data.sort(
            (a, b) =>
                Number(b.mean_abs_shap) -
                Number(a.mean_abs_shap)
        );

        // Top 10 features
        const topFeatures = data.slice(0, 10);

        const labels = topFeatures.map(
            row => row.feature
        );

        const values = topFeatures.map(
            row => Number(row.mean_abs_shap)
        );

        const canvas = document.getElementById("shapChart");

        if (!canvas) {
            throw new Error("shapChart canvas not found");
        }

        // Remove existing chart
        const existingChart = Chart.getChart(canvas);

        if (existingChart) {
            existingChart.destroy();
        }

        new Chart(canvas, {

            type: "bar",

            data: {

                labels: labels,

                datasets: [{
                    label: "Mean |SHAP value|",
                    data: values,
                    borderWidth: 1
                }]

            },

            options: {

                indexAxis: "y",

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                },

                scales: {

                    x: {
                        beginAtZero: true
                    }

                }

            }

        });

        console.log("===== GLOBAL SHAP =====");
        console.log("Features loaded:", data.length);
        console.log("Top 10:", topFeatures);

    } catch (error) {

        console.error("Global SHAP error:", error);

        container.innerHTML += `
            <p>
                <strong>SHAP Error:</strong>
                ${error.message}
            </p>
        `;
    }
}

loadGlobalShap();



// PART5
// ==========================================
// CLV SUMMARY - DYNAMIC DATA
// ==========================================

async function loadCLVSummary() {

    const container = document.getElementById("clvSummary");

    try {

        const response = await fetch(
            "../data/processed/clv_summary.csv"
        );

        if (!response.ok) {
            throw new Error("clv_summary.csv could not be loaded");
        }

        const csvText = await response.text();

        const result = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true
        });

        const data = result.data;

        console.log("===== CLV SUMMARY =====");
        console.log(data);

        // Display the CSV data dynamically
        let html = "";

        data.forEach(row => {

            const keys = Object.keys(row);

            keys.forEach(key => {

                if (
                    row[key] !== "" &&
                    row[key] !== null &&
                    row[key] !== undefined
                ) {

                    html += `
                        <p>
                            ${key.replaceAll("_", " ")}
                            <strong>${row[key]}</strong>
                        </p>
                    `;

                }

            });

        });

        container.innerHTML = html;

    } catch (error) {

        console.error("CLV Summary Error:", error);

        container.innerHTML = `
            <p>
                <strong>CLV Error:</strong>
                ${error.message}
            </p>
        `;
    }
}

loadCLVSummary();





// PART5

// ==========================================
// CLV SEGMENT DISTRIBUTION - DYNAMIC
// ==========================================

async function loadCLVDistribution() {

    try {

        const response = await fetch(
            "../data/processed/clv_summary.csv"
        );

        if (!response.ok) {
            throw new Error("clv_summary.csv could not be loaded");
        }

        const csvText = await response.text();

        const result = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true
        });

        const data = result.data;

        console.log("===== CLV DISTRIBUTION =====");
        console.log(data);

        const labels = data.map(
            row => row.clv_segment
        );

        const counts = data.map(
            row => Number(row.count)
        );

        const canvas = document.getElementById("clvChart");

        if (!canvas) {
            throw new Error("clvChart canvas not found");
        }

        const existingChart = Chart.getChart(canvas);

        if (existingChart) {
            existingChart.destroy();
        }

        new Chart(canvas, {

            type: "doughnut",

            data: {

                labels: labels,

                datasets: [{

                    data: counts,

                    borderWidth: 1

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        });

    }
    catch (error) {

        console.error(
            "CLV Distribution Error:",
            error
        );

    }

}

loadCLVDistribution();







// PART7



// ==========================================
// CHECK RECOMMENDATION CSV COLUMNS
// ==========================================

async function checkRecommendationColumns() {

    try {

        const response = await fetch(
            "../data/processed/final_recommendation_results.csv"
        );

        if (!response.ok) {
            throw new Error(
                "final_recommendation_results.csv could not be loaded"
            );
        }

        const csvText = await response.text();

        const result = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true
        });

        // console.log("===== RECOMMENDATION CSV =====");
        // console.log("Columns:");
        // console.log(Object.keys(result.data[0]));

        // console.log("First row:");
        // console.log(result.data[0]);

// ==========================================
// CHECK RECOMMENDATION CSV COLUMNS
// ==========================================

async function checkRecommendationColumns() {

    try {

        const response = await fetch(
            "../data/processed/final_recommendation_results.csv"
        );

        if (!response.ok) {
            throw new Error(
                "final_recommendation_results.csv could not be loaded"
            );
        }

        const csvText = await response.text();

        const result = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true
        });

        console.log("===== RECOMMENDATION CSV =====");
        console.log("Columns:");
        console.log(Object.keys(result.data[0]));

        console.log("First row:");
        console.log(result.data[0]);

    }
    catch (error) {

        console.error(
            "Recommendation CSV Error:",
            error
        );

    }
}

checkRecommendationColumns();




    }
    catch (error) {

        console.error(
            "Recommendation CSV Error:",
            error
        );

    }
}

checkRecommendationColumns();


// ==========================================
// PRODUCT RECOMMENDATIONS - DYNAMIC
// ==========================================

let recommendationData = [];
let categoryTranslation = {};

async function loadRecommendations() {

    const container = document.getElementById(
        "recommendationContainer"
    );

    try {

        // Load recommendation CSV
        const recommendationResponse = await fetch(
            "../data/processed/final_recommendation_results.csv"
        );

        if (!recommendationResponse.ok) {
            throw new Error(
                "final_recommendation_results.csv could not be loaded"
            );
        }

        const recommendationCSV =
            await recommendationResponse.text();

        const recommendationResult = Papa.parse(
            recommendationCSV,
            {
                header: true,
                skipEmptyLines: true
            }
        );

        recommendationData =
            recommendationResult.data;


        // Load category translation CSV
        const translationResponse = await fetch(
            "../data/processed/category_translation_clean.csv"
        );

        if (!translationResponse.ok) {
            throw new Error(
                "category_translation_clean.csv could not be loaded"
            );
        }

        const translationCSV =
            await translationResponse.text();

        const translationResult = Papa.parse(
            translationCSV,
            {
                header: true,
                skipEmptyLines: true
            }
        );


        // Create translation dictionary
        translationResult.data.forEach(row => {

            const portugueseCategory =
                row.product_category_name;

            const englishCategory =
                row.product_category_name_english;

            if (
                portugueseCategory &&
                englishCategory
            ) {

                categoryTranslation[
                    portugueseCategory
                ] = englishCategory;

            }

        });


        console.log(
            "Recommendations loaded:",
            recommendationData.length
        );

        console.log(
            "Category translations loaded:",
            Object.keys(categoryTranslation).length
        );


        // Unique customers
        const customers = [
            ...new Set(
                recommendationData.map(
                    row => row.customer_unique_id
                )
            )
        ];


        // Dashboard HTML
        container.innerHTML = `

            <div class="recommendation-search">

                <label for="recommendationCustomer">
                    Select Customer
                </label>

                <select id="recommendationCustomer">

                    <option value="">
                        Select a customer
                    </option>

                </select>

            </div>


            <div id="recommendationResults">

                <p>
                    Select a customer to view
                    recommended products.
                </p>

            </div>

        `;


        const select =
            document.getElementById(
                "recommendationCustomer"
            );


        // Add customers
        customers.forEach(customerId => {

            const option =
                document.createElement("option");

            option.value = customerId;

            option.textContent = customerId;

            select.appendChild(option);

        });


        // Customer selection
        select.addEventListener(
            "change",
            function () {

                const customerId =
                    this.value;

                const results =
                    document.getElementById(
                        "recommendationResults"
                    );


                if (!customerId) {

                    results.innerHTML = `
                        <p>
                            Select a customer to view
                            recommended products.
                        </p>
                    `;

                    return;

                }


                // Find recommendations
                const recommendations =
                    recommendationData
                    .filter(
                        row =>
                            row.customer_unique_id ===
                            customerId
                    )
                    .sort(
                        (a, b) =>
                            Number(a.rank) -
                            Number(b.rank)
                    );


                if (
                    recommendations.length === 0
                ) {

                    results.innerHTML = `
                        <p>
                            No recommendations found
                            for this customer.
                        </p>
                    `;

                    return;

                }


                // Create recommendation cards
                results.innerHTML = `

                    <div class="recommendation-list">

                        ${recommendations.map(row => {

                            const englishCategory =
                                categoryTranslation[
                                    row.product_category_name
                                ] ||
                                row.product_category_name ||
                                "Unknown Category";


                            // Make category readable
                            const readableCategory =
                                englishCategory
                                    .replace(/_/g, " ")
                                    .replace(
                                        /\b\w/g,
                                        letter =>
                                            letter.toUpperCase()
                                    );


                            return `

                                <div class="recommendation-card">

                                    <div class="recommendation-rank">
                                        #${row.rank}
                                    </div>


                                    <div class="recommendation-info">

                                        <p>
                                            Recommended Product
                                        </p>

                                        <strong>
                                            ${row.recommended_product_id}
                                        </strong>


                                        <span>
                                            ${readableCategory}
                                        </span>

                                    </div>

                                </div>

                            `;

                        }).join("")}

                    </div>

                `;

            }
        );


    }
    catch (error) {

        console.error(
            "Recommendation Error:",
            error
        );

        container.innerHTML = `
            <p>
                <strong>
                    Recommendation Error:
                </strong>
                ${error.message}
            </p>
        `;

    }

}

loadRecommendations();






async function loadGlobalShapModel() {

    const container =
        document.getElementById("churnExplanation");

    try {

        const response = await fetch(
            "../data/processed/shap_feature_importance.csv"
        );

        if (!response.ok) {
            throw new Error(
                "shap_feature_importance.csv could not be loaded"
            );
        }

        const csvText = await response.text();

        const result = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true
        });

        const data = result.data;

        data.sort(
            (a, b) =>
                Number(b.mean_abs_shap) -
                Number(a.mean_abs_shap)
        );

        const topFeatures = data.slice(0, 10);

        const labels = topFeatures.map(
            row => row.feature
        );

        const values = topFeatures.map(
            row => Number(row.mean_abs_shap)
        );

        const canvas =
            document.getElementById("globalShapChart");

        if (!canvas) {
            throw new Error(
                "globalShapChart canvas not found"
            );
        }

        const existingChart =
            Chart.getChart(canvas);

        if (existingChart) {
            existingChart.destroy();
        }

        new Chart(canvas, {

            type: "bar",

            data: {

                labels: labels,

                datasets: [{

                    label: "Mean |SHAP value|",

                    data: values,

                    borderWidth: 1

                }]

            },

            options: {

                indexAxis: "y",

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                },

                scales: {

                    x: {
                        beginAtZero: true
                    }

                }

            }

        });

    } catch (error) {

        console.error(
            "Global SHAP error:",
            error
        );

        container.innerHTML += `
            <p>
                <strong>SHAP Error:</strong>
                ${error.message}
            </p>
        `;
    }
}

loadGlobalShapModel();


