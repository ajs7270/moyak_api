// 행동(get,post등등) 요청 시 돌아갈 메소드 정의

const Post = require('models/post');

var classify = require('./classify.js'); // 성분명 검색시 & read함수
//var new = require('./update.js'); // 업데이트 시 & 업뎃함수

exports.write = async (ctx) => {
    const { 
        item_seq, item_name_ko, item_name_en, bar_code, entp_name, item_permit_date, class_no, chart,
        material_name, ee_doc, ud_doc, nb_doc, storage_method, valid_term, pack_unit, doc_text,
        newdrug_class_name, induty_type, ingr_name } = ctx.request.body;

    const post = new Post({
        item_seq, item_name_ko, item_name_en, bar_code, entp_name, item_permit_date, class_no, chart,
        material_name, ee_doc, ud_doc, nb_doc, storage_method, valid_term, pack_unit, doc_text,
        newdrug_class_name, induty_type, ingr_name
    });


    try {
        await post.save();
        ctx.body = post;
    } catch(e) {
        ctx.throw(e, 500);
    }
}; // 일단 write는 쓰지않음


exports.list =(ctx) => {

    
    const page = parseInt(ctx.query.page || 1, 10); // 페이지개수
    
    console.log(ctx.query['jisu']);
    console.log(id);
 //   var  sdf = API_selector(파라미터)   

    if(page<1){
        ctx.status =400;
        return;
    }
    try{
       
        ctx.body = posts;

    } catch(e) {
        ctx.throw(e, 500);
    }
}; // posts?page=n 으로 집어넣으면 된다.

exports.read = async (ctx) => {
    const { id } = ctx.params;
    try{
        const post = await Post.findById(id).exec();
        if(!post){
            ctx.status = 404;
            return;
        }
        ctx.body = post;

    } catch(e) {
        ctx.throw(e, 500);
    }
};

exports.remove = (ctx) => {

};
/*
ports.update = async (ctx) => { const { item_seq, item_name_ko, item_name_en, bar_code, entp_name, item_permit_date, class_no, chart, material_name, ee_doc, ud_doc, nb_doc, storage_method, valid_term, pack_unit, doc_text,
                   newdrug_class_name, induty_type, ingr_name } = ctx.request.body;

    var B = {  [X] : Y };
    
    try{
      
        const post = await Post.update( { CON1 : new.item_num() }, { $set: new.updateByItem_Seq() });
        ctx.body = post;
       
        console.log("업뎃완료");
    }catch(e) {
        ctx.throw(e, 500);
    }
};

*/