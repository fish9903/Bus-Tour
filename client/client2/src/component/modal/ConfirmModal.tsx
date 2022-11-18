import {ReactNode, useState} from 'react';
import MPortal from './MPortal';

interface IConfirmModal {
    title: string;
    content: string;
    onConfirm: () => any;
    children?: ReactNode
    display: boolean;
}

const ConfirmModal: React.FC<IConfirmModal> = (props) => {
    const [confirm, setConfirm] = useState(false);

    const confirmController = () => {
        if(confirm) {

        }
    }

    return <MPortal display={props.display}>
        <div>
            <div>{props.title}</div>
            <p>{props.content}</p>
            <div>
            <input type='checkbox' onChange={(e) => {
                setConfirm(e.target.checked);
            }}/>
            <span>위 제시된 설명을 확인하였습니다.</span>
            </div>
            <button onClick={confirmController} disabled={!confirm}>확인</button>
            <button>취소</button>
        </div>
    </MPortal>
}

export default ConfirmModal;