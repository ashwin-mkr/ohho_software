import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LogDetailModal = ({ log, isOpen, onClose }) => {
  if (!isOpen || !log) return null;

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'error': return 'text-error bg-error/10 border-error/20';
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      case 'info': return 'text-primary bg-primary/10 border-primary/20';
      case 'debug': return 'text-text-secondary bg-muted border-border';
      default: return 'text-text-secondary bg-muted border-border';
    }
  };

  const getLevelIcon = (level) => {
    switch (level?.toLowerCase()) {
      case 'error': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'info': return 'Info';
      case 'debug': return 'Bug';
      default: return 'Circle';
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-surface border border-border rounded-lg shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getLevelColor(log?.level)}`}>
              <Icon name={getLevelIcon(log?.level)} size={16} />
              <span className="uppercase">{log?.level}</span>
            </div>
            <h2 className="text-xl font-semibold text-text-primary">Log Details</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Copy"
              onClick={() => copyToClipboard(JSON.stringify(log, null, 2))}
            >
              Copy JSON
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary">Timestamp</label>
                  <div className="mt-1 p-3 bg-muted/50 rounded-lg border border-border">
                    <div className="font-mono text-sm text-text-primary">{formatTimestamp(log?.timestamp)}</div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-text-secondary">Source</label>
                  <div className="mt-1 p-3 bg-muted/50 rounded-lg border border-border">
                    <div className="font-medium text-text-primary">{log?.source}</div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-text-secondary">Request ID</label>
                  <div className="mt-1 p-3 bg-muted/50 rounded-lg border border-border flex items-center justify-between">
                    <div className="font-mono text-sm text-text-primary">{log?.requestId}</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Copy"
                      onClick={() => copyToClipboard(log?.requestId)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary">User Context</label>
                  <div className="mt-1 p-3 bg-muted/50 rounded-lg border border-border">
                    <div className="text-text-primary">{log?.userId || 'System'}</div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-text-secondary">IP Address</label>
                  <div className="mt-1 p-3 bg-muted/50 rounded-lg border border-border">
                    <div className="font-mono text-sm text-text-primary">{log?.ipAddress}</div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-text-secondary">Response Time</label>
                  <div className="mt-1 p-3 bg-muted/50 rounded-lg border border-border">
                    <div className="text-text-primary">{log?.responseTime}ms</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium text-text-secondary">Message</label>
              <div className="mt-1 p-4 bg-muted/50 rounded-lg border border-border">
                <div className="text-text-primary whitespace-pre-wrap">{log?.message}</div>
              </div>
            </div>

            {/* User Agent */}
            <div>
              <label className="text-sm font-medium text-text-secondary">User Agent</label>
              <div className="mt-1 p-3 bg-muted/50 rounded-lg border border-border">
                <div className="text-sm text-text-primary break-all">{log?.userAgent}</div>
              </div>
            </div>

            {/* Stack Trace */}
            {log?.stackTrace && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-text-secondary">Stack Trace</label>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Copy"
                    onClick={() => copyToClipboard(log?.stackTrace)}
                  >
                    Copy Stack Trace
                  </Button>
                </div>
                <div className="p-4 bg-surface border border-border rounded-lg overflow-x-auto">
                  <pre className="text-xs text-text-secondary font-mono whitespace-pre-wrap">
                    {log?.stackTrace}
                  </pre>
                </div>
              </div>
            )}

            {/* Additional Context */}
            {log?.context && (
              <div>
                <label className="text-sm font-medium text-text-secondary">Additional Context</label>
                <div className="mt-1 p-4 bg-muted/50 rounded-lg border border-border">
                  <pre className="text-sm text-text-primary whitespace-pre-wrap">
                    {JSON.stringify(log?.context, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Related Logs */}
            {log?.relatedLogs && log?.relatedLogs?.length > 0 && (
              <div>
                <label className="text-sm font-medium text-text-secondary">Related Log Entries</label>
                <div className="mt-2 space-y-2">
                  {log?.relatedLogs?.map((relatedLog, index) => (
                    <div key={index} className="p-3 bg-muted/30 rounded-lg border border-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            relatedLog?.level === 'error' ? 'bg-error' :
                            relatedLog?.level === 'warning' ? 'bg-warning' :
                            relatedLog?.level === 'info' ? 'bg-primary' : 'bg-muted-foreground'
                          }`} />
                          <span className="text-sm font-medium text-text-primary">{relatedLog?.message}</span>
                        </div>
                        <span className="text-xs text-text-secondary">
                          {new Date(relatedLog.timestamp)?.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/20">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            variant="default"
            iconName="ExternalLink"
            iconPosition="right"
          >
            View in Context
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogDetailModal;