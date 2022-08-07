import {
  ToastSuccessContainer,
  ToastErrorContainer,
  ToastContent,
  ToastWarningContainer
} from './styles';

export type ToastType = 'success' | 'error' | 'warning';

export type ToastProps = {
  text: string;
  type?: ToastType;
  closeToast?: () => void;
};

const mapTypeToToastContainer = {
  success: ToastSuccessContainer,
  error: ToastErrorContainer,
  warning: ToastWarningContainer
};

const mapTypeToToastEmoji: Record<ToastType, string> = {
  success: '🥳',
  error: '😥',
  warning: '🧐'
};

export const mapTypeToToastEmojiLabel: Record<ToastType, string> = {
  error: 'carinha triste',
  success: 'carinha comemorando',
  warning: 'carinha curiosa'
};

export function Toast({ text, type = 'success', closeToast }: ToastProps) {
  const ToastContainer = mapTypeToToastContainer[type] || mapTypeToToastContainer.error;
  const emoji = mapTypeToToastEmoji[type] || mapTypeToToastEmoji.error;
  const emojiLabel = mapTypeToToastEmojiLabel[type] || mapTypeToToastEmojiLabel.error;

  return (
    <ToastContainer role="dialog" onClick={() => closeToast?.()}>
      <ToastContent>
        <div>
          <span role="img" aria-label={emojiLabel}>
            {emoji}
          </span>
        </div>
        {text}
      </ToastContent>
    </ToastContainer>
  );
}
