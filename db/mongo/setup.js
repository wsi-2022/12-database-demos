const mdb = require('./connect.js');
const url = process.env.MONGO_URL;

const db_name = 'vax_data';

// TODO: Set raw JSON data for insertion
// const vax_records_json = ``;
// Parse the JSON for insertion
// const vax_records = JSON.parse(vax_records_json);
const seed_data = [
  {":@computed_region_43wa_7qmu":"9",":@computed_region_6mkv_f3dw":"21194",":@computed_region_bdys_3d7i":"377",":@computed_region_rpca_8um6":"40",":@computed_region_vrxf_vc4k":"1",":created_at":"2021-02-23T16:03:12.714Z",":id":"row-yfqn_bkdi~7x27",":updated_at":"2021-02-23T16:03:14.703Z",":version":"rv-um8t-ip8h-bu6z","zip_code":"60616","date":"2021-02-22T00:00:00.000","total_doses_daily":"101","total_doses_cumulative":"9686","_1st_dose_daily":"45","_1st_dose_cumulative":"6716","_1st_dose_percent_population":"0.124","vaccine_series_completed_daily":"56","vaccine_series_completed_cumulative":"2970","vaccine_series_completed_percent_population":"0.055","population":"54197","zip_code_location":{"type":"Point","coordinates":[-87.629531,41.844869]},"row_id":"60616-20210222"}
  ,{":@computed_region_43wa_7qmu":"30",":@computed_region_6mkv_f3dw":"4300",":@computed_region_bdys_3d7i":"199",":@computed_region_rpca_8um6":"8",":@computed_region_vrxf_vc4k":"69",":created_at":"2021-02-23T16:03:12.714Z",":id":"row-4zcj_5v4x.xy79",":updated_at":"2021-02-23T16:03:14.703Z",":version":"rv-3tfw~6gws~g338","zip_code":"60652","date":"2021-02-22T00:00:00.000","total_doses_daily":"84","total_doses_cumulative":"4923","_1st_dose_daily":"56","_1st_dose_cumulative":"3779","_1st_dose_percent_population":"0.087","vaccine_series_completed_daily":"28","vaccine_series_completed_cumulative":"1144","vaccine_series_completed_percent_population":"0.026","population":"43447","zip_code_location":{"type":"Point","coordinates":[-87.714238,41.745398]},"row_id":"60652-20210222"}
  ,{":@computed_region_43wa_7qmu":"10",":@computed_region_6mkv_f3dw":"14913",":@computed_region_bdys_3d7i":"368",":@computed_region_rpca_8um6":"35",":@computed_region_vrxf_vc4k":"38",":created_at":"2021-02-23T16:03:12.714Z",":id":"row-9nc6.jgc8.qf5n",":updated_at":"2021-02-23T16:03:14.703Z",":version":"rv-kdmm_kkzx.ay5v","zip_code":"60605","date":"2021-02-22T00:00:00.000","total_doses_daily":"82","total_doses_cumulative":"8425","_1st_dose_daily":"30","_1st_dose_cumulative":"5250","_1st_dose_percent_population":"0.181","vaccine_series_completed_daily":"52","vaccine_series_completed_cumulative":"3175","vaccine_series_completed_percent_population":"0.109","population":"29060","zip_code_location":{"type":"Point","coordinates":[-87.623449,41.867824]},"row_id":"60605-20210222"}
];


(async function() {
  try {
    const connection = await mdb.connect(url);
    const db = connection.db(db_name);
    const collection = db.collection('by_zip');

    // We always want to reset from scratch,
    // so drop this collection right away
    try {
      await collection.drop();
    } catch(e) {
      console.error(e.message);
    }

    const vr = await collection.insertMany(seed_data);
    console.log(`Inserted ${vr.insertedCount} records`);

    const vr_count = await collection.stats();
    console.log(`Collection has ${vr_count.count} records`);

    if(connection) {
      connection.close();
      console.log(`Close database connection`);
    }
  } catch(e) {
    console.error(e.stack);
  }
})();
