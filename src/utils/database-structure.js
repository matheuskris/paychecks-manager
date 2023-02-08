export const db = {
  projects: {
    projectId: {
      id: "",
      name: "",
      Holerits: {
        holeritId: {},
      },
    },
  },
  workers: {
    workerId: {
      id: "",
      name: "",
      periods: {
        paycheck: {
          paycheckId: {
            id: 0,
            projectId: "",
            valueInCents: 0,
            workerId: 0,
            workerName: "",
            client: "",
            authorName: "",
            createdAt: new Date(),
            competence: new Date(),
            expiration: new Date(),
            displayed: new Date(),
            downloaded: new Date(),
            docUrl: "",
          },
        },
      },
    },
  },
  period: {
    periodId: {
      month: 0,
      year: 0,
      paychecks: {
        paycheckId: {},
      },
    },
  },
};

const example = {
  chave: "item",
  competence: "10/2022",
  workerId: "98",
  workerName: "CARINE DOS SANTOS BRAZ",
  valueInCents: "2.504,20",
};
