import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LogTable = ({ logs, onLogSelect, selectedLog, isLoading }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRowExpansion = (logId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded?.has(logId)) {
      newExpanded?.delete(logId);
    } else {
      newExpanded?.add(logId);
    }
    setExpandedRows(newExpanded);
  };

  const getLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'error': return 'text-error bg-error/10';
      case 'warning': return 'text-warning bg-warning/10';
      case 'info': return 'text-primary bg-primary/10';
      case 'debug': return 'text-text-secondary bg-muted';
      default: return 'text-text-secondary bg-muted';
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

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  if (isLoading) {
    return (
      <div className="bg-surface border border-border rounded-lg p-8 shadow-elevation-1">
        <div className="flex items-center justify-center space-x-3">
          <Icon name="Loader2" size={24} className="animate-spin text-primary" />
          <span className="text-text-secondary">Loading system logs...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg shadow-elevation-1 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-semibold text-text-primary">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span>Timestamp</span>
                </div>
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-text-primary">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={16} />
                  <span>Level</span>
                </div>
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-text-primary">
                <div className="flex items-center space-x-2">
                  <Icon name="Server" size={16} />
                  <span>Source</span>
                </div>
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-text-primary">
                <div className="flex items-center space-x-2">
                  <Icon name="User" size={16} />
                  <span>User</span>
                </div>
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-text-primary">
                <div className="flex items-center space-x-2">
                  <Icon name="MessageSquare" size={16} />
                  <span>Message</span>
                </div>
              </th>
              <th className="text-center px-4 py-3 text-sm font-semibold text-text-primary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {logs?.map((log) => (
              <React.Fragment key={log?.id}>
                <tr 
                  className={`hover:bg-muted/30 transition-colors duration-150 ${
                    selectedLog?.id === log?.id ? 'bg-primary/5' : ''
                  }`}
                >
                  <td className="px-4 py-3 text-sm text-text-secondary font-mono">
                    {formatTimestamp(log?.timestamp)}
                  </td>
                  <td className="px-4 py-3">
                    <div className={`inline-flex items-center space-x-2 px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(log?.level)}`}>
                      <Icon name={getLevelIcon(log?.level)} size={12} />
                      <span className="uppercase">{log?.level}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-primary font-medium">
                    {log?.source}
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">
                    {log?.userId || 'System'}
                  </td>
                  <td className="px-4 py-3 text-sm text-text-primary max-w-md">
                    <div className="truncate" title={log?.message}>
                      {log?.message}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName={expandedRows?.has(log?.id) ? "ChevronUp" : "ChevronDown"}
                        onClick={() => toggleRowExpansion(log?.id)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => onLogSelect(log)}
                      />
                    </div>
                  </td>
                </tr>
                {expandedRows?.has(log?.id) && (
                  <tr className="bg-muted/20">
                    <td colSpan="6" className="px-4 py-4">
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-text-primary">Request ID:</span>
                            <span className="ml-2 text-text-secondary font-mono">{log?.requestId}</span>
                          </div>
                          <div>
                            <span className="font-medium text-text-primary">IP Address:</span>
                            <span className="ml-2 text-text-secondary font-mono">{log?.ipAddress}</span>
                          </div>
                          <div>
                            <span className="font-medium text-text-primary">User Agent:</span>
                            <span className="ml-2 text-text-secondary">{log?.userAgent}</span>
                          </div>
                          <div>
                            <span className="font-medium text-text-primary">Response Time:</span>
                            <span className="ml-2 text-text-secondary">{log?.responseTime}ms</span>
                          </div>
                        </div>
                        {log?.stackTrace && (
                          <div>
                            <div className="font-medium text-text-primary mb-2">Stack Trace:</div>
                            <pre className="bg-surface border border-border rounded p-3 text-xs text-text-secondary overflow-x-auto font-mono">
                              {log?.stackTrace}
                            </pre>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {logs?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No logs found</h3>
          <p className="text-text-secondary">Try adjusting your filters or time range</p>
        </div>
      )}
    </div>
  );
};

export default LogTable;