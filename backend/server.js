import express from "express";
import cors from "cors";
import { ethers } from "ethers";
import PDSArtifact from "../pds-project/artifacts/contracts/PDS.sol/PDS.json" with { type: "json" };

const app = express();

app.use(cors());
app.use(express.json());

// ================= PROVIDER =================

const provider =
  new ethers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

const wallet = new ethers.Wallet(
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  provider
);

// ================= CONTRACT =================

const contractAddress =
  "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const contract = new ethers.Contract(
  contractAddress,
  PDSArtifact.abi,
  wallet
);

// ================= REGISTER =================

app.post("/register", async (req, res) => {

  try {

    const {
      rationCard,
      name,
      entitlement
    } = req.body;

    const tx =
      await contract.registerBeneficiary(
        rationCard,
        name,
        entitlement
      );

    await tx.wait();

    res.send("Beneficiary Registered");

  } catch (err) {

    console.log(err);

    res.status(500).send("Error");

  }
});

// ================= GET BENEFICIARIES =================

app.get("/beneficiaries", async (req, res) => {

  try {

    const data =
      await contract.getAllBeneficiaries();

    const formatted = data.map((b) => ({
      rationCard: b.rationCard,
      name: b.name,
      entitlement: b.entitlement.toString(),
    }));

    res.json(formatted);

  } catch (err) {

    console.log(err);

    res.status(500).send("Error");

  }
});

// ================= ADD TRANSFER =================

app.post("/transfer", async (req, res) => {

  try {

    const {
      from,
      to,
      quantity
    } = req.body;

    const tx =
      await contract.addTransfer(
        from,
        to,
        quantity
      );

    await tx.wait();

    res.send("Transfer Added");

  } catch (err) {

    console.log(err);

    res.status(500).send("Error");

  }
});

// ================= GET TRANSFERS =================

app.get("/transfers", async (req, res) => {

  try {

    const data =
      await contract.getAllTransfers();

    const formatted = data.map((t) => ({
      from: t.from,
      to: t.to,
      quantity: t.quantity.toString(),
      timestamp: t.timestamp.toString(),
    }));

    res.json(formatted);

  } catch (err) {

    console.log(err);

    res.status(500).send("Error");

  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});