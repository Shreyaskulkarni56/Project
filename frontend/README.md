# Production Data Viewer (Production Report UI)

## ⚠️ STRICT WARNING

🚫 **DO NOT CLONE, COPY, OR REUSE THIS PROJECT** 🚫

## 📌 Project Overview

This project is a **Production Data Viewer UI** that allows users to view production details based on a selected **date range** and **machine**. It is designed for manufacturing/production environments where managers or operators need quick insights into machine-wise production data.

The user can:

* Select a **From Date** and **To Date**
* Choose a **Machine** from multiple available machines
* Click **Submit** to view filtered production details

---

## 🎯 Features

* 📅 Date range filtering (From Date → To Date)
* 🏭 Machine-wise production data selection
* 📊 Clean and user-friendly UI
* ⚡ Fast filtering without page reload
* 📥 (Optional) Export / Download report functionality

---

## 🧩 UI Flow

1. User selects **From Date**
2. User selects **To Date**
3. User selects a **Machine** from the dropdown list
4. User clicks the **Submit** button
5. Production data is displayed based on the selected filters

---

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Styling:** CSS / Tailwind CSS (if applicable)
* **Icons:** Lucide-react (if used)
* **State Management:** React Hooks (`useState`)

---

## 📂 Project Structure

```
project-root/
│
├── src/
│   ├── components/
│   │   ├── ProductionReport.jsx
│   │   └── MachineDropdown.jsx
│   │
│   ├── data/
│   │   └── MachineData.js
│   │
│   ├── styles/
│   │   └── ProductionReport.css
│   │
│   └── App.js
│
├── public/
├── package.json
└── README.md
```

---

## 📊 Data Handling

* Production data is stored in a structured format (JSON / JS object)
* Dates are parsed and compared using JavaScript `Date` objects
* Machine filtering is done using machine ID or machine name

---

## 🧪 Example Use Case

* Production manager wants to see **Machine A** production between **01-01-2026** and **07-01-2026**
* Selects the date range and machine
* Clicks submit
* UI displays filtered production records instantly

---

## 🔮 Future Enhancements

* 📈 Graphs & charts (Idle time, production efficiency)


## 👤 Author

**Shreyas Kulkarni**
Production Data UI Project

---

## 📄 License

This project is for educational and internal use.
