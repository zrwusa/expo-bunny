import Modal, {ModalProps} from 'react-native-modal';
import * as React from 'react';
import {useBunnyKit} from '../../hooks/bunny-kit';
import {getStyles} from './styles';

export interface ModalFromRightProps {
    modalProps?: Omit<ModalProps, 'isVisible'>,
    isVisible?: boolean,
    onVisibleChanged?: (isVisible: boolean) => void
}

export const ModalFromRight: React.FC<ModalFromRightProps> = (props) => {
    const {modalProps, children, isVisible = false, onVisibleChanged} = props;
    const {sizeLabor, themeLabor} = useBunnyKit();
    const styles = getStyles(sizeLabor, themeLabor);
    return <Modal isVisible={isVisible}
                  onSwipeComplete={() => onVisibleChanged?.(false)}
                  swipeDirection="right"
                  animationIn="slideInRight"
                  animationOut="slideOutRight"
                  style={styles.modal}
                  propagateSwipe={true}
                  onBackdropPress={() => onVisibleChanged?.(false)}
                  {...modalProps}>
        {children}
    </Modal>
}
