import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const MyTokenModule = buildModule("MyTokenModule", (m) => {

  const MTK = m.contract("MyToken");

  return { MTK };
});

export default MyTokenModule;
