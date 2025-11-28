import React, { useState, useCallback, CSSProperties, ReactNode } from 'react';

// ── MOCK: React Native Shim for Web Preview ─────────────────────────────────
// The preview environment cannot resolve native modules.
// We mock them with HTML/CSS to visualize the production UI logic.

type StyleProp = CSSProperties | (CSSProperties | false | undefined)[] | undefined;

const flattenStyle = (style: StyleProp): CSSProperties => {
  if (Array.isArray(style)) return Object.assign({}, ...style.filter(Boolean));
  return style || {};
};

const StyleSheet = { create: <T extends Record<string, CSSProperties>>(s: T): T => s };

interface ViewProps {
  style?: StyleProp;
  children?: ReactNode;
}

const View = ({ style, children, ...props }: ViewProps) => (
  <div style={{ display: 'flex', flexDirection: 'column', boxSizing: 'border-box', ...flattenStyle(style) }} {...props}>
    {children}
  </div>
);

interface TextProps {
  style?: StyleProp;
  children?: ReactNode;
}

const Text = ({ style, children, ...props }: TextProps) => (
  <span style={{ display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', ...flattenStyle(style) }} {...props}>
    {children}
  </span>
);

interface TouchableOpacityProps {
  style?: StyleProp;
  children?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  activeOpacity?: number;
}

const TouchableOpacity = ({ style, children, onPress, disabled }: TouchableOpacityProps) => (
  <button
    onClick={onPress}
    disabled={disabled}
    style={{
      border: 'none',
      background: 'transparent',
      padding: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      ...flattenStyle(style),
    }}
  >
    {children}
  </button>
);

interface ActivityIndicatorProps {
  color?: string;
}

const ActivityIndicator = ({ color }: ActivityIndicatorProps) => (
  <div style={{ color: color || '#000', textAlign: 'center', fontWeight: 'bold' }}>
    ⟳ PROCESSING...
  </div>
);

const Alert = {
  alert: (title: string, message: string) => {
    setTimeout(() => window.alert(`[Native Alert]\n${title}\n\n${message}`), 50);
  },
};

const Haptics = {
  ImpactFeedbackStyle: { Medium: 'medium' as const },
  NotificationFeedbackType: { Warning: 'warning' as const, Success: 'success' as const, Error: 'error' as const },
  impactAsync: () => console.log('📳 Haptic: Impact'),
  notificationAsync: (type: string) => console.log(`📳 Haptic: Notification (${type})`),
};

// ── MOCK: Inlined Hook Logic ────────────────────────────────────────────────
interface TranscodeResult {
  success: boolean;
  fallback: boolean;
  message?: string;
  durationMs: number;
  filesizeBytes: number;
  outputPath: string;
}

interface TranscoderState {
  isLoading: boolean;
  error: string | null;
  transcoderVersion: number;
  isTranscoderAvailable: boolean;
  buildTimestamp: number;
}

const useVideoTranscoder = () => {
  const [state, setState] = useState<TranscoderState>({
    isLoading: false,
    error: null,
    transcoderVersion: 100,
    isTranscoderAvailable: true,
    buildTimestamp: Date.now(),
  });

  const startTranscode = useCallback(async (input: string, output: string): Promise<TranscodeResult> => {
    setState(s => ({ ...s, isLoading: true, error: null }));
    
    await new Promise(r => setTimeout(r, 1500));

    const successResult: TranscodeResult = {
      success: true,
      fallback: false,
      durationMs: 14500,
      filesizeBytes: 4500000,
      outputPath: output
    };
    
    setState(s => ({ ...s, isLoading: false }));
    return successResult;
  }, []);

  return { ...state, startTranscode };
};

const TEMP_INPUT_PATH = '/var/mobile/tmp/raw_clip.mov';
const TEMP_OUTPUT_PATH = '/var/mobile/Documents/heshur_clip.mp4';

export default function TranscodeComponent() {
  const { 
    startTranscode, 
    isLoading, 
    error, 
    transcoderVersion, 
    isTranscoderAvailable, 
    buildTimestamp,
  } = useVideoTranscoder();

  const handleTranscode = async () => {
    Haptics.impactAsync();
    const result = await startTranscode(TEMP_INPUT_PATH, TEMP_OUTPUT_PATH);

    if (result && !result.success && result.fallback) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      Alert.alert("Stub Mode Active", `${result.message || 'Fallback required'}. Switching to FFmpeg-Kit fallback.`);
    } else if (result && result.success) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert(
        "Transcode Complete", 
        `Size: ${(result.filesizeBytes / 1024 / 1024).toFixed(2)} MB\nPath: ${result.outputPath}`
      );
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const getStatusColor = () => {
    if (error) return '#ff1744';
    if (isLoading) return '#2979ff';
    if (isTranscoderAvailable) return '#00e676';
    return '#666';
  };

  return (
    <View style={styles.previewContainer}>
      <View style={styles.cardContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.header}>Heshur Engine</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>
              {isLoading ? 'BUSY' : (isTranscoderAvailable ? 'READY' : 'OFFLINE')}
            </Text>
          </View>
        </View>

        <View style={styles.metaContainer}>
          <Text style={styles.label}>Core Version:</Text>
          <Text style={styles.value}>v{transcoderVersion}</Text>
        </View>
        <View style={styles.metaContainer}>
          <Text style={styles.label}>Build:</Text>
          <Text style={styles.value}>{new Date(buildTimestamp).toLocaleDateString()}</Text>
        </View>

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorTitle}>Process Failure</Text>
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            (!isTranscoderAvailable || isLoading) && styles.buttonDisabled
          ]}
          onPress={handleTranscode}
          disabled={!isTranscoderAvailable || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.buttonText}>INITIATE TRANSCODE (15s)</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    display: 'flex',
    flex: 1,
    height: '100vh',
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardContainer: {
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#333',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  statusBadge: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#000',
    fontWeight: '800',
    fontSize: 10,
    letterSpacing: 1,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  value: {
    color: '#aaa',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  errorBox: {
    backgroundColor: 'rgba(255, 23, 68, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#ff1744',
    padding: 12,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 4,
  },
  errorTitle: {
    color: '#ff1744',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  errorMessage: {
    color: '#ff8a80',
    fontSize: 13,
    lineHeight: 1.4,
  },
  button: {
    backgroundColor: '#00e676',
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  buttonDisabled: {
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#444',
    cursor: 'not-allowed',
  },
  buttonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 1,
  },
});
