import { cartList } from "../utils/request";
export default {
    acActive(context, num) {
        context.commit('muActive', num)
    },
    acBadgeNum(context) {
        if (sessionStorage.getItem("user")) {
            let uid = JSON.parse(sessionStorage.getItem("user")).uid;
            cartList({ uid }).then(res => {
                if (!(res.data.list.length != 0 || res.data.list != null)) {
                    return
                }
                let totalCart = 0;
                for (let i = 0; i < res.data.list.length; i++) {
                    totalCart += res.data.list[i].num;
                }
                context.commit('muBadgeNum', totalCart)
            });
        }
    }
}