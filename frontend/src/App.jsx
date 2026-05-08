import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  // ================= STATES =================

  const [form, setForm] = useState({
    rationCard: "",
    name: "",
    entitlement: "",
    from: "",
    to: "",
    quantity: "",
  });

  const [beneficiaries, setBeneficiaries] = useState([]);

  const [transfers, setTransfers] = useState([]);

  const [stats, setStats] = useState({
    totalTransfers: 0,
    totalQuantity: 0,
  });

  // ================= REGISTER BENEFICIARY =================

  const register = async () => {

    try {

      await axios.post(
        "http://localhost:5000/register",
        {
          rationCard: form.rationCard,
          name: form.name,
          entitlement: Number(form.entitlement),
        }
      );

      alert("Beneficiary Added Successfully");

      await fetchBeneficiaries();

      setForm({
        ...form,
        rationCard: "",
        name: "",
        entitlement: "",
      });

    } catch (err) {

      console.log(err);

      alert("Registration Failed");

    }
  };

  // ================= ADD TRANSFER =================

  const transfer = async () => {

    try {

      await axios.post(
        "http://localhost:5000/transfer",
        {
          from: form.from,
          to: form.to,
          quantity: Number(form.quantity),
        }
      );

      alert("Transfer Recorded Successfully");

      await fetchTransfers();

      setForm({
        ...form,
        from: "",
        to: "",
        quantity: "",
      });

    } catch (err) {

      console.log(err);

      alert("Transfer Failed");

    }
  };

  // ================= FETCH BENEFICIARIES =================

  const fetchBeneficiaries = async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:5000/beneficiaries"
        );

      setBeneficiaries(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  // ================= FETCH TRANSFERS =================

  const fetchTransfers = async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:5000/transfers"
        );

      setTransfers(res.data);

      const totalQty = res.data.reduce(
        (sum, item) =>
          sum + Number(item.quantity),
        0
      );

      setStats({
        totalTransfers: res.data.length,
        totalQuantity: totalQty,
      });

    } catch (err) {

      console.log(err);

    }
  };

  // ================= INITIAL LOAD =================

  useEffect(() => {

    fetchBeneficiaries();
    fetchTransfers();

  }, []);

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >

      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
        }}
      >

        {/* ================= HEADER ================= */}

        <div
          style={{
            background:
              "linear-gradient(135deg, #1e3c72, #2a5298)",
            padding: "35px",
            borderRadius: "20px",
            color: "white",
            marginBottom: "30px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.15)",
          }}
        >

          <h1
            style={{
              fontSize: "52px",
              marginBottom: "10px",
              color: "#a8adb3",
            }}
          >
            Smart PDS Dashboard
          </h1>

          <p
            style={{
              opacity: 0.9,
              fontSize: "16px",
            }}
          >
            Blockchain-Based Transparent
            Public Distribution System
          </p>

        </div>

        {/* ================= ANALYTICS ================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(2,1fr)",
            gap: "20px",
            marginBottom: "30px",
          }}
        >

          <div style={cardStyle}>

            <h3 style={{ color: "#666" }}>
              Total Transfers
            </h3>

            <h1
              style={{
                fontSize: "42px",
                color: "#1e3c72",
              }}
            >
              {stats.totalTransfers}
            </h1>

          </div>

          <div style={cardStyle}>

            <h3 style={{ color: "#666" }}>
              Total Quantity Moved
            </h3>

            <h1
              style={{
                fontSize: "42px",
                color: "#1e3c72",
              }}
            >
              {stats.totalQuantity}
            </h1>

          </div>

        </div>

        {/* ================= BENEFICIARY MANAGEMENT ================= */}

        <div style={sectionStyle}>

          <h2 style={sectionTitle}>
            Beneficiary Management
          </h2>

          <div style={gridStyle}>

            <input
              style={inputStyle}
              placeholder="Ration Card ID"
              value={form.rationCard}
              onChange={(e) =>
                setForm({
                  ...form,
                  rationCard:
                    e.target.value,
                })
              }
            />

            <input
              style={inputStyle}
              placeholder="Beneficiary Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <input
              style={inputStyle}
              placeholder="Monthly Entitlement"
              value={form.entitlement}
              onChange={(e) =>
                setForm({
                  ...form,
                  entitlement:
                    e.target.value,
                })
              }
            />

            <button
              style={blueButton}
              onClick={register}
            >
              Add Beneficiary
            </button>

          </div>

        </div>

        {/* ================= REGISTERED BENEFICIARIES ================= */}

        <div style={sectionStyle}>

          <h2 style={sectionTitle}>
            Registered Beneficiaries
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse:
                "collapse",
            }}
          >

            <thead>

              <tr
                style={{
                  background: "#304a84",
                  color: "white",
                }}
              >

                <th style={tableHeader}>
                  Ration Card
                </th>

                <th style={tableHeader}>
                  Name
                </th>

                <th style={tableHeader}>
                  Entitlement
                </th>

              </tr>

            </thead>

            <tbody>

              {beneficiaries.length > 0 ? (

                beneficiaries.map(
                  (b, i) => (

                    <tr
                      key={i}
                      style={{
                        background:
                          i % 2 === 0
                            ? "#f9fbff"
                            : "white",
                      }}
                    >

                      <td style={tableCell}>
                        {b.rationCard}
                      </td>

                      <td style={tableCell}>
                        {b.name}
                      </td>

                      <td style={tableCell}>
                        {b.entitlement}
                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="3"
                    style={{
                      padding: "20px",
                      textAlign:
                        "center",
                    }}
                  >
                    No Beneficiaries
                    Registered
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* ================= SUPPLY CHAIN ================= */}

        <div style={sectionStyle}>

          <h2 style={sectionTitle}>
            Supply Chain Management
          </h2>

          <div style={gridStyle}>

            <input
              style={inputStyle}
              placeholder="Source (FCI / State)"
              value={form.from}
              onChange={(e) =>
                setForm({
                  ...form,
                  from: e.target.value,
                })
              }
            />

            <input
              style={inputStyle}
              placeholder="Destination"
              value={form.to}
              onChange={(e) =>
                setForm({
                  ...form,
                  to: e.target.value,
                })
              }
            />

            <input
              style={inputStyle}
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) =>
                setForm({
                  ...form,
                  quantity:
                    e.target.value,
                })
              }
            />

            <button
              style={greenButton}
              onClick={transfer}
            >
              Record Transfer
            </button>

          </div>

        </div>

        {/* ================= BLOCKCHAIN LOGS ================= */}

        <div style={sectionStyle}>

          <h2 style={sectionTitle}>
            Blockchain Audit Logs
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse:
                "collapse",
            }}
          >

            <thead>

              <tr
                style={{
                  background: "#1e3c72",
                  color: "white",
                }}
              >

                <th style={tableHeader}>
                  Source
                </th>

                <th style={tableHeader}>
                  Destination
                </th>

                <th style={tableHeader}>
                  Quantity
                </th>

                <th style={tableHeader}>
                  Timestamp
                </th>

              </tr>

            </thead>

            <tbody>

              {transfers.length > 0 ? (

                transfers.map(
                  (t, i) => (

                    <tr
                      key={i}
                      style={{
                        background:
                          i % 2 === 0
                            ? "#f9fbff"
                            : "white",
                      }}
                    >

                      <td style={tableCell}>
                        {t.from}
                      </td>

                      <td style={tableCell}>
                        {t.to}
                      </td>

                      <td style={tableCell}>
                        {t.quantity}
                      </td>

                      <td style={tableCell}>
                        {t.timestamp}
                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    style={{
                      padding: "20px",
                      textAlign:
                        "center",
                    }}
                  >
                    No Blockchain
                    Transactions
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const cardStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "18px",
  boxShadow:
    "0 4px 12px rgba(0,0,0,0.08)",
};

const sectionStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "18px",
  marginBottom: "30px",
  boxShadow:
    "0 4px 12px rgba(0,0,0,0.08)",
};

const sectionTitle = {
  marginBottom: "20px",
  color: "#1e3c72",
  fontSize: "32px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(4,1fr)",
  gap: "15px",
};

const inputStyle = {
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
};

const blueButton = {
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px",
};

const greenButton = {
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px",
};

const tableHeader = {
  padding: "16px",
  textAlign: "left",
};

const tableCell = {
  padding: "14px",
  borderBottom:
    "1px solid #e5e7eb",
};

export default App;