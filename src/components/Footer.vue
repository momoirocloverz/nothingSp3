<template>
    <div class="footer">
        <div class="footerTop clearfix">
            <div class="top">
                <div class="codeLeft">
                    <span class="chat">客服公众号</span>
                    <img src="../assets/logo.png" alt="code" class="code">
                </div>
                <div class="line"></div>
                <div class="tRight">
                    <div class="textTop">
                        <div class="textSmall">客服热线</div>
                        <div class="textBig">0571-8685 0115</div>
                    </div>
                    <div class="textbtm">
                        <div class="textSmall">工作日</div>
                        <div class="textBig">09:00 - 18:00</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footerBtm">
            <p>浙ICP备12003285号-1 &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; -Copyright ©2015</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "afoot",
};
</script>
<style lang='scss' scoped>
.code {
    width: 98px;
    height: 98px;
    background-color: #ffffff;
    display: block;
}
.chat {
    font-size: 16px;
    line-height: 24px;
    color: #ffffff;
    display: block;
    margin-bottom: 18px;
    width: 98px;
    text-align: center;
}
.line {
    width: 1px;
    height: 91px;
    background: #fff;
    opacity: 0.6;
    float: left;
}
.codeLeft {
    float: left;
}
.footerTop {
    height: 200px;
    background: #29343e;
    width: 100%;
    margin: 0 auto;
}
.top {
    width: 464px;
    height: 200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.tRight {
    float: left;
}
.textSmall {
    font-size: 14px;
    line-height: 24px;
    color: #fff;
    margin-bottom: 10px;
}
.textBig {
    font-size: 24px;
    line-height: 24px;
    color: #fff;
}
.textTop {
    margin-bottom: 30px;
}
.footerBtm {
    height: 40px;
    background: #1b2229;

    p {
        width: 500px;
        font-size: 14px;
        color: #ffffff;
        text-align: center;
        height: 40px;
        line-height: 40px;
        margin: 0 auto;
    }
}
// .footer{
//     width:100%;
//     position: fixed;
//     bottom: 0
// }
</style>