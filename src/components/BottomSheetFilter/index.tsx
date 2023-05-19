import React, {
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import type { BottomSheetFilterI, BottomSheetFilterProps } from './types';
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

const defaultSnapPoints = ['25%', '50%', '70%'];

const BottomSheetFilter = React.forwardRef<
  BottomSheetFilterI,
  BottomSheetFilterProps
>(
  (
    {
      children,
      renderButton,
      snapPoints: snapPointsProp,
      renderFooter: renderFooterProp,
      ...props
    },
    ref
  ) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const onOpen = useCallback(() => {
      bottomSheetModalRef.current?.present?.();
    }, [bottomSheetModalRef]);

    const onClose = useCallback(() => {
      bottomSheetModalRef.current?.close?.();
    }, [bottomSheetModalRef]);

    useImperativeHandle(ref, () => ({ onOpen, onClose }), [onClose, onOpen]);

    const snapPoints = useMemo(
      () => (snapPointsProp ? snapPointsProp : defaultSnapPoints),
      [snapPointsProp]
    );

    const renderBackdrop = useCallback(
      (backdropProps: BottomSheetDefaultBackdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      ),
      []
    );

    const renderFooterComponent = useCallback(
      () => <>{renderFooterProp?.({ onClose, onOpen })}</>,
      [onClose, onOpen, renderFooterProp]
    );

    return (
      <>
        {renderButton ? renderButton({ onClose, onOpen }) : null}

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={2}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          footerComponent={renderFooterComponent}
          {...props}
        >
          {typeof children === 'function'
            ? children({ onOpen, onClose })
            : children}
        </BottomSheetModal>
      </>
    );
  }
);

export default BottomSheetFilter;
