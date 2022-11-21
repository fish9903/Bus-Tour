import { ReactNode, useState } from 'react';
import MPortal from './MPortal';
import styles from './ConfirmModal.module.css';

interface IConfirmModal {
    title: string;
    onConfirm: () => void;
    onReject: () => void;
    children?: ReactNode
    display: boolean;
}

const ConfirmModal: React.FC<IConfirmModal> = (props) => {
    const [confirm, setConfirm] = useState(false);

    const confirmController = () => {
        if (confirm) {
            props.onConfirm();
        }
    }

    const rejectController = () => {
        setConfirm(false);
        props.onReject();
    }

    return <MPortal display={props.display}>
        <div className={styles['modal']}>
            <h2 className={styles['modal-title']}>{props.title}</h2>
            <div className={styles['modal-content']}>{props.children}</div>
            <div className={styles['confirm-message']}
                onClick={() => {
                    setConfirm(prev => !prev);
                }}>
                <input type='checkbox'
                checked={confirm} onChange={(e) => {
                    setConfirm(e.target.checked);
                }}
                />
                <span>위 제시된 설명을 확인하였습니다.</span>
            </div>
            <div className={styles['modal-buttons']}>
                <button onClick={confirmController} disabled={!confirm}>확인</button>
                <button onClick={rejectController}>취소</button>
            </div>
        </div>
    </MPortal>
}

export default ConfirmModal;