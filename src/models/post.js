// DB스키마 정의

const mongoose = require('mongoose');

const { Schema } = mongoose;


const Post = new Schema({
    item_seq: String,
    item_name_ko: String,
    item_name_en: String,
    bar_code: String,
    entp_name: String,
    item_permit_date: String,
    class_no: String,
    chart: String,
    material_name: String,
    ee_doc: String,
    ud_doc: String,
    nb_doc: String,
    storage_method: String,
    valid_term: String,
    pack_unit: String,
    doc_text: String,
    newdrug_class_name: String,
    induty_type: String,
    ingr_name: String
});


module.exports = mongoose.model('Post', Post); //스키마이름(데이터베이스 컬렉션 이름이 됨, 복수형태로), 스키마객체 