// 입력받기 : 품목코드나 바코드 추가할 컬럼 이랑 내용 을 받아야대

// item_num, column, text  입력 받는다는 가정               
//          

var item_num = "195500004"

var column = "NAME"

var text = "test"

var B = { [column] : text };

exports.item_num = function() =
{
    return item_num;
}
exports.updateByItem_Seq = function()
{
    retrun B;
}
