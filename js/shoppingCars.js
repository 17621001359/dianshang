// 获取购物车的数据
function getShoppingCar(cb) {
    //从cookie中获取用户名
    $.get("./getShoppingCart.php", { "vipName": "1381721758" }, function (datas) {
        console.log(datas)
        let htmlStr = "";

        datas.forEach(goods => {
            htmlStr += `
            <div class="con_c">
                <input type="checkbox" class="two">
                <img class="tit_imgs" src="${goods.goodsImg}" alt="">
                <em class="goodsId">${goods.goodsId} </em>
                <span>${goods.goodsName} </span>
                <span class="danjia">${goods.goodsPrice}</span>元
                <input type="button"value="-" class="reduceBtn">
                <input type="text" value=${goods.goodsCount}>
                <input type="button" value="+" class="addBtn">
                <span class="xiaoji">${goods.goodsPrice}</span>元
                <span class="delBtn">x</span>
            </div>                       
            `;
        });


        // 把产生html字符串放在html页面上
        $(".tem-box").html(htmlStr);
        cb(); //给dom元素添加事件
    }, "json")
}

//修改购物车中商品的数量()
// 参数:
// 商品编号，修改后的商品数量
function updateCount(goodsId, goodsCount, cb) {
    //从cookie中获取用户名
    $.get("./updateGoodsCount.php", {
        "vipName": "宋超波",
        "goodsId": goodsId,
        "goodsCount": goodsCount
    }, function (data) {
        if (data == "0") {
            alert("服务器出错：修改数量失败");
        } else {
            // 前端修改数量
            cb();
        }
    });
}

$(function () {
    getShoppingCar(addEvent);
});

//添加事件 
function addEvent() {
    $(".first").check($(".tem-box :checkbox"));
    $(".first").click(function () {
        $(".two").prop("checked", this.checked);
    });


    $(":checkbox").click(function () {
        totalMoney();
    });



    $(".addBtn").click(function () {
        // 数量
        let goodsId = $(this).parent().find(".goodsId").html();
        let count = $(this).prev().val();
        count++;
        updateCount(goodsId, count, () => {
            $(this).prev().val(count);
            // 单价
            let price = $(this).prev().prev().prev().html();
          
            // 计算金额
           
            let money = price * count;
      
            console.log(money)
            $(this).next().html(money);
        });
        totalMoney();
    });


    $(".reduceBtn").click(function () {
        // 数量
        let goodsId = $(this).parent().find(".goodsId").html();
        let count = $(this).next().val();
        count--;
        if (count < 1) {
            count = 0;
        }
        updateCount(goodsId, count, () => {
            $(this).next().val(count);
            // 单价
            let price = $(this).prev().html();
            // 计算金额
            let money = price * count;
            console.log(money)
            $(this).next().next().next().html(money);

            // 同时改变当前行的复选框的状态
            if (count == 0) {
                $(this).parent().parent().find(":checkbox").prop("checked", false);
                // $(this).parent().parent().remove();
            }
            // 总金额
            totalMoney();
        })



    });
    $(".delBtn").click(function(){
        if(confirm("亲，您真的要删除吗？")){
            $(this).parent().remove();
            totalMoney();
        }
        let goodsId = $(this).parent().find(".goodsId").html();
        let vipNames =  getCookie("username")
 

        $.get("deleteGoods.php",{
            "vipName": vipNames,
            "goodsId": goodsId
        } ,function(str){
            if(str=="1"){
                alert("删除成功")
            }else{
                alter("删除失败")
            }
        })
    });
}

// 感觉用户体验不怎么好，
// 其实应该点击 + 或者 - 的时候或者点击选框的弟弟们任何一个时就触发选框的事件，
// - 到 0 的时候就不选中选框了
// 计算总金额
function totalMoney() {
    // 
    let money = 0;
    let $tr = $(".con_c");
    $tr.each(function () {
        // 复选框是不是选中了
        if($(this).find(":checkbox").prop("checked")){
        money += parseFloat($(this).find(".xiaoji").html());
        }
    });
    $(".zongji").html(money);
}
