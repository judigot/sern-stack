import "dotenv/config";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const customer = "Jude Francis Igot";
const numbers = [643, 2653, 754, 436, 253, 846, 679, 547, 235, 32541, 547, 568];
const iterators = [months, numbers];
const year = 2018;
const weeklyQuery =
  "SELECT CONCAT(\"₱ \", FORMAT(SUM(`app_order_product`.`product_price`*`app_order_product`.`quantity`) - SUM(`app_order_product`.`discount`), 2)) FROM `app_order` INNER JOIN `app_order_product` ON `app_order`.`order_id`=`app_order_product`.`order_id` WHERE `order_date` >= '%s' AND `order_date` < (DATE('%s') + INTERVAL 1 DAY)";
const monthlyQuery =
  "SELECT CONCAT(\"₱ \", FORMAT(SUM(`app_order_product`.`product_price`*`app_order_product`.`quantity`) - SUM(`app_order_product`.`discount`), 2)) FROM `app_order` INNER JOIN `app_order_product` ON `app_order`.`order_id`=`app_order_product`.`order_id` WHERE `order_date` >= '%s' AND `order_date` < (DATE('%s') + INTERVAL 1 DAY)";

//==========TABLE==========//
const table = {
  Month: months,
  "Customer Name": customer,
  "Custom Identifier": numbers,
  "Week 1 (1 - 7)": (index: number) => {
    const month = index + 1 < 10 ? "0" + (index + 1) : index + 1;

    const start = `${year}-${month}-01`;
    const end = `${year}-${month}-07`;

    return (
      'SELECT CONCAT("₱ ", FORMAT(SUM(`app_order_product`.`product_price`*`app_order_product`.`quantity`) - SUM(`app_order_product`.`discount`), 2)) FROM `app_order` INNER JOIN `app_order_product` ON `app_order`.`order_id`=`app_order_product`.`order_id` WHERE `order_date` >= \'' +
      start +
      "' AND `order_date` < (DATE('" +
      end +
      "') + INTERVAL 1 DAY)"
    );
  },
  "Week 2 (8 - 14)": (index: number) => {
    const month = index + 1 < 10 ? "0" + (index + 1) : index + 1;

    const start = `${year}-${month}-08`;
    const end = `${year}-${month}-14`;

    return (
      'SELECT CONCAT("₱ ", FORMAT(SUM(`app_order_product`.`product_price`*`app_order_product`.`quantity`) - SUM(`app_order_product`.`discount`), 2)) FROM `app_order` INNER JOIN `app_order_product` ON `app_order`.`order_id`=`app_order_product`.`order_id` WHERE `order_date` >= \'' +
      start +
      "' AND `order_date` < (DATE('" +
      end +
      "') + INTERVAL 1 DAY)"
    );
  },
  "Week 3 (15 - 21)": (index: number) => {
    const month = index + 1 < 10 ? "0" + (index + 1) : index + 1;

    const start = `${year}-${month}-15`;
    const end = `${year}-${month}-21`;

    return (
      'SELECT CONCAT("₱ ", FORMAT(SUM(`app_order_product`.`product_price`*`app_order_product`.`quantity`) - SUM(`app_order_product`.`discount`), 2)) FROM `app_order` INNER JOIN `app_order_product` ON `app_order`.`order_id`=`app_order_product`.`order_id` WHERE `order_date` >= \'' +
      start +
      "' AND `order_date` < (DATE('" +
      end +
      "') + INTERVAL 1 DAY)"
    );
  },
  "Week 4 (22 - 31)": (index: number) => {
    const month = index + 1 < 10 ? "0" + (index + 1) : index + 1;
    const maxDaysInAMonth = new Date(year, <number>month, 0).getDate();

    const start = `${year}-${month}-22`;
    const end = `${year}-${month}-${maxDaysInAMonth}`;

    return (
      'SELECT CONCAT("₱ ", FORMAT(SUM(`app_order_product`.`product_price`*`app_order_product`.`quantity`) - SUM(`app_order_product`.`discount`), 2)) FROM `app_order` INNER JOIN `app_order_product` ON `app_order`.`order_id`=`app_order_product`.`order_id` WHERE `order_date` >= \'' +
      start +
      "' AND `order_date` < (DATE('" +
      end +
      "') + INTERVAL 1 DAY)"
    );
  },
  "Gross Sales": (index: number) => {
    const month = index + 1 < 10 ? "0" + (index + 1) : index + 1;
    const maxDaysInAMonth = new Date(year, <number>month, 0).getDate();

    const start = `${year}-${month}-01`;
    const end = `${year}-${month}-${maxDaysInAMonth}`;

    return (
      'SELECT CONCAT("₱ ", FORMAT(SUM(`app_order_product`.`product_price`*`app_order_product`.`quantity`) - SUM(`app_order_product`.`discount`), 2)) FROM `app_order` INNER JOIN `app_order_product` ON `app_order`.`order_id`=`app_order_product`.`order_id` WHERE `order_date` >= \'' +
      start +
      "' AND `order_date` < (DATE('" +
      end +
      "') + INTERVAL 1 DAY)"
    );
  },
};

const sql = reportBuilder(12, table);

console.log(sql);

function reportBuilder(rowCount: number, table: any) {
  // Check first if iterators have the same number of elements

  const columnNames: any = Object.keys(table);

  // Combine iterators e.g. month and customer name into a single array
  const staticValues: any = {};

  const iterators = [];

  for (let i = 0; i < Object.keys(table).length; i++) {
    const columnName: any = columnNames[i];
    const value: any = table[columnName];
    if (Array.isArray(value)) {
      iterators.push(i);
    }
  }

  for (let i = 0; i < rowCount; i++) {
    let statics: any = {};
    for (let j = 0; j < iterators.length; j++) {
      const iterator = iterators[j];
      const columnName: any = columnNames[iterator];
      const value: any = table[columnName];
      statics[`${columnName}`] = value[i];
    }
    staticValues[i] = statics;
  }
  //   console.log(staticValues);

  // Build query
  const rows = [];
  for (let i = 0; i < rowCount; i++) {
    let sql = "SELECT ";

    for (let j = 0; j < Object.keys(table).length; j++) {
      const columnName = columnNames[j];
      const value = table[columnName];
      const type = typeof value;

      //   console.log(type);

      if (type === "object") {
        sql += `'${staticValues[i][columnName]}' AS \`${columnName}\`, `;
      }

      if (type === "function") {
        // Loop through the main months e.g. months
        // console.log(value);
        const query = value(i);
        sql += `(${query}) AS \`${columnName}\`, `;
      }

      if (type === "string") {
        const query = value;
        sql += `('${query}') AS \`${columnName}\`, `;
      }
    }

    rows.push(sql.slice(0, -2));
  }
  return rows.join(" UNION ") + ";";
}
