import { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, Home } from 'lucide-react';
import { YazLogo } from './YazLogo';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Tadmamte application:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleResetCache = () => {
    try {
      localStorage.removeItem('tifawin_cart');
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-brand-sand flex flex-col items-center justify-center p-6 text-center font-sans" dir="rtl">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-brand-brown/10 shadow-xl space-y-6">
            <div className="w-16 h-16 bg-brand-gold/15 text-brand-gold rounded-full flex items-center justify-center mx-auto border border-brand-gold/30">
              <YazLogo className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-reem text-2xl font-bold text-brand-brown">
                حدث خطأ غير متوقع
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                نعتذر عن هذا الخطأ المؤقت. تم تأمين بياناتك وسلتك بشكل سليم. يمكنك تحديث الصفحة للمتابعة.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center justify-center gap-2 bg-brand-brown hover:bg-brand-earth text-white font-bold px-6 py-3.5 rounded-xl text-xs transition-all shadow-sm cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-brand-gold" />
                <span>تحديث الصفحة</span>
              </button>

              <button
                onClick={this.handleResetCache}
                className="inline-flex items-center justify-center gap-2 bg-brand-sand hover:bg-brand-sand/70 text-brand-brown font-bold px-5 py-3.5 rounded-xl text-xs transition-all cursor-pointer border border-brand-brown/10"
              >
                <Home className="w-4 h-4 text-brand-gold" />
                <span>إعادة فتح المتجر</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
