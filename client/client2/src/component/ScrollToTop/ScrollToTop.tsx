import { useEffect } from "react";
import { useLocation} from "react-router-dom";
// 여기서 영감을 받은 코드
// https://www.matthewhoelter.com/2022/04/02/how-to-scroll-to-top-on-route-change-with-react-router-dom-v6.html
const ScrollToTop = () => {
    const {pathname} = useLocation();

    useEffect(() => {
        document.documentElement.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'
        });
    },[pathname]);

    return null;
}

export default ScrollToTop;