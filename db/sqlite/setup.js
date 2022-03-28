const db_name = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const db = require('./connect.js').connect(`db/sqlite/${db_name}.sqlite3`);

const seed_data = [
  {":@computed_region_43wa_7qmu":"9",":@computed_region_6mkv_f3dw":"21194",":@computed_region_bdys_3d7i":"377",":@computed_region_rpca_8um6":"40",":@computed_region_vrxf_vc4k":"1",":created_at":"2021-02-23T16:03:12.714Z",":id":"row-yfqn_bkdi~7x27",":updated_at":"2021-02-23T16:03:14.703Z",":version":"rv-um8t-ip8h-bu6z","zip_code":"60616","date":"2021-02-22T00:00:00.000","total_doses_daily":"101","total_doses_cumulative":"9686","_1st_dose_daily":"45","_1st_dose_cumulative":"6716","_1st_dose_percent_population":"0.124","vaccine_series_completed_daily":"56","vaccine_series_completed_cumulative":"2970","vaccine_series_completed_percent_population":"0.055","population":"54197","zip_code_location":{"type":"Point","coordinates":[-87.629531,41.844869]},"row_id":"60616-20210222"}
  ,{":@computed_region_43wa_7qmu":"30",":@computed_region_6mkv_f3dw":"4300",":@computed_region_bdys_3d7i":"199",":@computed_region_rpca_8um6":"8",":@computed_region_vrxf_vc4k":"69",":created_at":"2021-02-23T16:03:12.714Z",":id":"row-4zcj_5v4x.xy79",":updated_at":"2021-02-23T16:03:14.703Z",":version":"rv-3tfw~6gws~g338","zip_code":"60652","date":"2021-02-22T00:00:00.000","total_doses_daily":"84","total_doses_cumulative":"4923","_1st_dose_daily":"56","_1st_dose_cumulative":"3779","_1st_dose_percent_population":"0.087","vaccine_series_completed_daily":"28","vaccine_series_completed_cumulative":"1144","vaccine_series_completed_percent_population":"0.026","population":"43447","zip_code_location":{"type":"Point","coordinates":[-87.714238,41.745398]},"row_id":"60652-20210222"}
  ,{":@computed_region_43wa_7qmu":"10",":@computed_region_6mkv_f3dw":"14913",":@computed_region_bdys_3d7i":"368",":@computed_region_rpca_8um6":"35",":@computed_region_vrxf_vc4k":"38",":created_at":"2021-02-23T16:03:12.714Z",":id":"row-9nc6.jgc8.qf5n",":updated_at":"2021-02-23T16:03:14.703Z",":version":"rv-kdmm_kkzx.ay5v","zip_code":"60605","date":"2021-02-22T00:00:00.000","total_doses_daily":"82","total_doses_cumulative":"8425","_1st_dose_daily":"30","_1st_dose_cumulative":"5250","_1st_dose_percent_population":"0.181","vaccine_series_completed_daily":"52","vaccine_series_completed_cumulative":"3175","vaccine_series_completed_percent_population":"0.109","population":"29060","zip_code_location":{"type":"Point","coordinates":[-87.623449,41.867824]},"row_id":"60605-20210222"}
];

// zip_code
// date
// _1st_dose_daily
// vaccine_series_completed_daily
// row_id

db.serialize(function() {
  let drop_table = `DROP TABLE IF EXISTS vax_data`;
  db.run(drop_table, function(err) {
    if (err) {
      console.error(err.message);
    }
  });
  let create_table = `CREATE TABLE vax_data
  (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    row_id VARCHAR(15),
    zip_code CHAR(5),
    vax_date TEXT,
    first_dose INTEGER,
    full_series INTEGER
  )`;
  db.run(create_table, function(err) {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Created vax_data table`);
    }
  });

  let seed_stmt = db.prepare(`INSERT INTO vax_data(row_id,zip_code,vax_date,first_dose,full_series) VALUES (?,?,?,?,?)`);
  // row_id
  // zip_code
  // date
  // _1st_dose_daily
  // vaccine_series_completed_daily
  for (let d of seed_data) {
    seed_stmt.run(d.row_id,d.zip_code,d.date,d._1st_dose_daily,d.vaccine_series_completed_daily);
  }
  seed_stmt.finalize();

  db.each("SELECT first_dose FROM vax_data", function(err,row) {
    if (err) {
      console.error(err.message);
    } else {
      console.log("First dose:", row.first_dose);
    }
  });
});
