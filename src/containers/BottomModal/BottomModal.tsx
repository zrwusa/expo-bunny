import Modal, {ModalProps} from "react-native-modal";
import * as React from "react";
import {useBunnyKit} from "../../hooks/bunny-kit";
import {getStyles} from "./styles";

export interface BottomModalProps {
    modalProps?: Omit<ModalProps, 'isVisible'>,
    isVisible?: boolean,
    onVisibleChanged?: (isVisible: boolean) => void
}

export const BottomModal: React.FC<BottomModalProps> = (props) => {
    const {modalProps, children, isVisible = false, onVisibleChanged} = props;
    const {sizeLabor, themeLabor} = useBunnyKit();
    const styles = getStyles(sizeLabor, themeLabor);

    return <Modal isVisible={isVisible}
                  onSwipeComplete={() => onVisibleChanged?.(false)}
                  swipeDirection="down"
                  style={styles.modal}
                  onBackdropPress={() => onVisibleChanged?.(false)}
                  {...modalProps}>
        {children}
    </Modal>
}
