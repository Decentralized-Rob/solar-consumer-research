export type TitanStateBankruptcy = {
  stateCode: string;
  debtorName: string;
  caseNumber: string;
};

export const titanBankruptcyCourtUrl = "https://www.azb.uscourts.gov/re-titan-solar-power-inc-and-its-affiliates";

export const titanStateBankruptcyByCode: Record<string, TitanStateBankruptcy> = {
  AZ: { stateCode: "AZ", debtorName: "Titan Solar Power AZ, Inc.", caseNumber: "2:24-bk-04979-DPC" },
  NV: { stateCode: "NV", debtorName: "Titan Solar Power NV, Inc.", caseNumber: "2:24-bk-05025-MCW" },
  CA: { stateCode: "CA", debtorName: "Titan Solar Power CA, Inc.", caseNumber: "2:24-bk-05224-DPC" },
  CO: { stateCode: "CO", debtorName: "Titan Solar Power CO, Inc.", caseNumber: "2:24-bk-05225-DPC" },
  FL: { stateCode: "FL", debtorName: "Titan Solar Power FL, Inc.", caseNumber: "2:24-bk-05226-EPB" },
  GA: { stateCode: "GA", debtorName: "Titan Solar Power GA, Inc.", caseNumber: "2:24-bk-05227-MCW" },
  ID: { stateCode: "ID", debtorName: "Titan Solar Power ID, Inc.", caseNumber: "2:24-bk-05228-BKM" },
  IL: { stateCode: "IL", debtorName: "Titan Solar Power IL, Inc.", caseNumber: "2:24-bk-05230-MCW" },
  LA: { stateCode: "LA", debtorName: "Titan Solar Power LA, Inc.", caseNumber: "2:24-bk-05231-PS" },
  MD: { stateCode: "MD", debtorName: "Titan Solar Power MD, Inc.", caseNumber: "2:24-bk-05233-DPC" },
  MO: { stateCode: "MO", debtorName: "Titan Solar Power MO, Inc.", caseNumber: "2:24-bk-05234-EPB" },
  MS: { stateCode: "MS", debtorName: "Titan Solar Power MS, Inc.", caseNumber: "2:24-bk-05235-DPC" },
  NC: { stateCode: "NC", debtorName: "Titan Solar Power NC, Inc.", caseNumber: "2:24-bk-05238-MCW" },
  NJ: { stateCode: "NJ", debtorName: "Titan Solar Power NJ, Inc.", caseNumber: "2:24-bk-05239-EPB" },
  NM: { stateCode: "NM", debtorName: "Titan Solar Power NM, Inc.", caseNumber: "2:24-bk-05240-BKM" },
  OH: { stateCode: "OH", debtorName: "Titan Solar Power OH, Inc.", caseNumber: "2:24-bk-05241-BKM" },
  SC: { stateCode: "SC", debtorName: "Titan Solar Power SC, Inc.", caseNumber: "2:24-bk-05243-EPB" },
  TN: { stateCode: "TN", debtorName: "Titan Solar Power TN, Inc.", caseNumber: "2:24-bk-05245-EPB" },
  TX: { stateCode: "TX", debtorName: "Titan Solar Power TX, Inc.", caseNumber: "2:24-bk-05248-DPC" },
  UT: { stateCode: "UT", debtorName: "Titan Solar Power UT, Inc.", caseNumber: "2:24-bk-05249-PS" },
  VA: { stateCode: "VA", debtorName: "Titan Solar VA, Inc.", caseNumber: "2:24-bk-05250-BKM" },
  WI: { stateCode: "WI", debtorName: "Titan Solar Power WI, Inc.", caseNumber: "2:24-bk-05251-EPB" },
};

export function getTitanStateBankruptcy(stateCode: string) {
  return titanStateBankruptcyByCode[stateCode];
}
