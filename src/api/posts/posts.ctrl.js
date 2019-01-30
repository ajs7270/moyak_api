// 행동(get,post등등) 요청 시 돌아갈 메소드 정의

const Post = require('models/post');

var classify = require('./classify.js'); // 성분명 검색시 & read함수
var new = require('./update.js'); // 업데이트 시 & 업뎃함수

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


exports.list = async (ctx) => {

    const { id } = ctx.params;
    const page = parseInt(ctx.query.page || 1, 10); // 페이지개수
    if(page<1){
        ctx.status =400;
        return;
    }
    try{
        
        if ( classify.name_x() == "painkiller" || classify.name_x() == "cold" || classify.name_x() == "skin_disease" )
        {
            // in & nin 활용
            const posts = await Post.find( { $and:[{ ee_doc : {$in: classify.symptom()}},{material_name : {$in: classify.ingredient()}},{ material_name : {$nin: classify.no_ingredient()}} ]}  )
            .sort({_id: 1 }) // 1 : 오름차순 , -1 : 내림차순
            .limit(5) // (한 페이지에) 몇 개를 읽을 것인가
            .skip((page-1)*5) // 몇 개씩 스킵할 것인가
            .exec();
        }

        else if( classify.name_x() == "allergy" || classify.name_x() == "vitamin" )
        {
            // in & nin 활용
            const posts = await Post.find( { class_no : {$in: classify.class_no()}}  )
            .sort({_id: 1 }) // 1 : 오름차순 , -1 : 내림차순
            .limit(5) // (한 페이지에) 몇 개를 읽을 것인가
            .skip((page-1)*5) // 몇 개씩 스킵할 것인가
            .exec();
        }

        else
        {
            // in & nin 활용
            const posts = await Post.find( { ee_doc : {$in: classify.symptom()}} )
            .sort({_id: 1 }) // 1 : 오름차순 , -1 : 내림차순
            .limit(5) // (한 페이지에) 몇 개를 읽을 것인가
            .skip((page-1)*5) // 몇 개씩 스킵할 것인가
            .exec();
        }
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

exports.update = async (ctx) => {
   
    const { 
        item_seq, item_name_ko, item_name_en, bar_code, entp_name, item_permit_date, class_no, chart,
        material_name, ee_doc, ud_doc, nb_doc, storage_method, valid_term, pack_unit, doc_text,
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

