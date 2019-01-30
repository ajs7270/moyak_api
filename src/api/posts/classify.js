/* catagories 랑 m1 ~ m5 까진 입력 받아야 합니다! (사용자에게, 큰 카테고리랑 체크체크박스) */ 
    /*
        X = 진통제/cold/skin_disease
       /allergy/Gastrointestinal_disease/Gastrointestinal disease
       /Intestinal disease/female_disease/vitamin  이 될수 있단다아
    */ 

var m1 = 1;// 열 | 콧물 | 무좀 |ㄴㄴㄴㄴ 위통,위산 과다 | 가스 | 월경 | 비타민제
var m2 = 0;// 근육통 | 기침 | 아토피 | * | 설사 | 피임
var m3 = 0;// 염증성 통증 | 몸살,열 | 상처 | * | 변비 | 질염
var m4 = 0; // 위장장애 |*|*|*|*|
var m5 = 0;  // 천식 |*|*|*|*|
     
     
     // 진통제 성분 만들어보기요
var symptom = new Array(); // 효능효과
var ingredient = new Array();//성분
var no_ingredient = new Array(); // 불필요 성분
var class_no = new Array();


var X = 'painkiller'; //가정한 것
    
// 진통제
if ( X == 'painkiller' ) // 안에 들어가는거 문자열인지 나중에 확인하기
{
    symptom.push("통증");

    if(m1 == 1) // 열
        ingredient.push("acetaminophen");
        ingredient.push("ibuprofen");
        ingredient.push("dexibuprofen"); 

    if(m2 == 1) // 근육통
        ingredient.push("naproxen");
        ingredient.push("naproxen sodium");
        ingredient.push("chlorzoxazone");

    if(m3 == 1 ) // 염증성 통증 ~ 포함X
        no_ingredient.push("acetaminophen");

    if( m4 == 1 ) // 위장장애
        ingredient.push("acetaminophen")
        ingredient.push("ibuprofen");

    if( m5 == 1 )
        ingredient.push("acetaminophen");
} 
// 감기
else if(X== 'cold' )
{   
    symptom.push('감기');

    if(m1==1)
      ingredient.push("chlorpheniramine");
      ingredient.push("methylephedrine");//snot;

    if(m2==1)
     ingredient.push("guaifenesin");
     ingredient.push("dextromethophan");//cough;

    if(m3==1)
     ingredient.push("acetaminophen");
     ingredient.push("ibuprofen");//sick_fever;
  
  
}
   //피부 질환 skin_disease 
else if(X== 'skin_disease')
{ 
    ingredient.push("aluminum chloride"); //염화 알루미늄-공통적으로 다있는것
    
    if(m1==1)//무좀이면
        symptom.push("무좀");
         
    if(m2==1)//아토피면
       symptom.push("아토피");
    
    if(m3==1)//상처면
        symptom.push("상처");
        
  }
  // 알러지_항히스타민제 **여긴고치기 여쭤보기보기보기
  else if(X == 'allergy' )
  {   
      class_no.push("항히스타민제");
     
  }
  
  //위장 질환Gastrointestinal disease
  else if ( X == 'Gastrointestinal_disease' )
  {  
    if(m1==1) // 위통 위산 과다
        symptom.push("위통");
        symptom.push("위산 과다");
      
      
  }
  //장 질환Intestinal disease **키워드 검사로되는건지?? 위에 위장질환 가스랑 겹치잖아
  else if( X == 'Intestinal_disease' )
  {
    if(m1==1)//가스
        symptom.push("가스");
    if(m2==1) //설사
        symptom.push("설사");
    if(m3==1) //변비
        symptom.push("변비");
  }
  //여성 질환female_disease
  else if ( X == 'female_disease')
  {
    if(m1==1) //월경
        symptom.push("월경");
    if(m2==1) //피임
        symptom.push("피임");
    if(m3==1) // 질염
        symptom.push("질염") ;
  }
  //vitamin 
  else if( X == 'vitamin' )
  {
      class_no.push("비타민");
  }

exports.ingredient = function()
{    
    return ingredient;
}

exports.no_ingredient = function()
{
    return no_ingredient;
}

exports.symptom = function()
{
    return symptom;
}
  

exports.class_no = function()
{
    return class_no;
}

exports.name_x = function()
{
    return X;
}