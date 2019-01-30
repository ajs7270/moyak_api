
/* categories 랑 m1 ~ m5 까진 입력 받아야 합니다! (사용자에게, 큰 카테고리랑 체크체크박스) */ 
    /*
        categories = 진통제/cold/skin_disease
       /allergy/Gastrointestinal_disease/Gastrointestinal disease
       /Intestinal disease/female_disease/vitamin  이 될수 있단다아
    */ 

var m1 = 1;// 열 | 콧물 | 무좀 | 위통,위산 과다 | 가스 | 월경 | 비타민제
var m2 = 0;// 근육통 | 기침 | 아토피 | * | 설사 | 피임
var m3 = 0;// 염증성 통증 | 몸살,열 | 상처 | * | 변비 | 질염
var m4 = 0; // 위장장애 |*|*|*|*|
var m5 = 0;  // 천식 |*|*|*|*|

class API_selector{
        constructor(categories, symptom){
            this.categories = categories;
            this.symptom = symptom;
            this.efficacy_effect = new Array(); // 효능효과
            this.ingredient = new Array();//성분
            this.no_ingredient = new Array(); // 불필요 성분
            this.class_no = new Array();

            // 진통제
            if ( categories == 'painkiller' ) // 안에 들어가는거 문자열인지 나중에 확인하기
            {
                efficacy_effect.push("통증");
            
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
            else if(categories== 'cold' )
            {   
                efficacy_effect.push('감기');
            
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
            else if(categories== 'skin_disease')
            { 
                ingredient.push("aluminum chloride"); //염화 알루미늄-공통적으로 다있는것
                
                if(m1==1)//무좀이면
                    efficacy_effect.push("무좀");
                    
                if(m2==1)//아토피면
                    efficacy_effect.push("아토피");
                
                if(m3==1)//상처면
                    efficacy_effect.push("상처");
                    
            }
            // 알러지_항히스타민제 **여긴고치기 여쭤보기보기보기
            else if(categories == 'allergy' )
            {   
                class_no.push("항히스타민제");
                
            }
            
            //위장 질환Gastrointestinal disease
            else if ( categories == 'Gastrointestinal_disease' )
            {  
                if(m1==1) // 위통 위산 과다
                    efficacy_effect.push("위통");
                    efficacy_effect.push("위산 과다");
                
            }

            //장 질환Intestinal disease **키워드 검사로되는건지?? 위에 위장질환 가스랑 겹치잖아
            else if( categories == 'Intestinal_disease' )
            {
                if(m1==1)//가스
                    efficacy_effect.push("가스");
                if(m2==1) //설사
                    efficacy_effect.push("설사");
                if(m3==1) //변비
                    efficacy_effect.push("변비");
            }
        
            //여성 질환female_disease
            else if ( categories == 'female_disease')
            {
                if(m1==1) //월경
                    efficacy_effect.push("월경");
                if(m2==1) //피임
                    efficacy_effect.push("피임");
                if(m3==1) // 질염
                    efficacy_effect.push("질염") ;
            }
              
            if ( categories == "painkiller" || categories == "cold" || categories == "skin_disease" )
            {
                // in & nin 활용
                const posts = await Post.find( { $and:[{ ee_doc : {$in: classify.symptom()}},{material_name : {$in: classify.ingredient()}},{ material_name : {$nin: classify.no_ingredient()}} ]}  )
                .sort({_id: 1 }) // 1 : 오름차순 , -1 : 내림차순
                .limit(5) // (한 페이지에) 몇 개를 읽을 것인가
                .skip((page-1)*5) // 몇 개씩 스킵할 것인가
                .exec();
            }

            else if( categories == "allergy" || categories == "vitamin" )
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
        }
}

exports.ingredient = function()
{    
    return ingredient;
}

exports.no_ingredient = function()
{
    return no_ingredient;
}

exports.efficacy_effect = function()
{
    return efficacy_effect;
}
  

exports.class_no = function()
{
    return class_no;
}

exports.name_x = function()
{
    return X;
}