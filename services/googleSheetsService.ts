
import { AdminLog } from '../types';

/**
 * Google Sheets Service for Alpha Terminal
 * Spreadsheet ID: 1LyS8hgsTg-OxPhI0ALZOG61WnWNqQkx0tdRwSppBljg
 * Admin: savan2004@gmail.com
 */

const SPREADSHEET_ID = '1LyS8hgsTg-OxPhI0ALZOG61WnWNqQkx0tdRwSppBljg';
const LOCAL_LOGS_KEY = 'alpha_terminal_admin_logs';

export class GoogleSheetsService {
  /**
   * Appends login record to both Google Cloud (simulated) and Local Admin Registry.
   */
  static async logLogin(email: string, mobile: string): Promise<void> {
    const timestampIST = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    const systemMetadata = `${navigator.platform} | ${navigator.language}`;
    
    const logEntry: AdminLog = {
      email,
      mobile,
      timestamp: timestampIST,
      metadata: systemMetadata
    };

    // 1. Persist locally for the Admin Panel UI
    const existingLogsRaw = localStorage.getItem(LOCAL_LOGS_KEY);
    const logs: AdminLog[] = existingLogsRaw ? JSON.parse(existingLogsRaw) : [];
    logs.unshift(logEntry); // Newest first
    localStorage.setItem(LOCAL_LOGS_KEY, JSON.stringify(logs.slice(0, 100))); // Keep last 100

    console.log(`[ADMIN-AUDIT] Logged session for ${email}`);

    try {
      // Logic for Google Sheets Sync (POST to Apps Script Web App)
      // fetch('https://script.google.com/macros/s/EXEC_ID/exec', { method: 'POST', body: JSON.stringify(logEntry) });
      await new Promise(resolve => setTimeout(resolve, 800));
    } catch (error) {
      console.error("Cloud Sync Failed:", error);
    }
  }

  /**
   * Retrieves all logs for the Admin Panel
   */
  static getLogs(): AdminLog[] {
    const raw = localStorage.getItem(LOCAL_LOGS_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  /**
   * Clears the local cache (Institutional Reset)
   */
  static clearLogs(): void {
    localStorage.removeItem(LOCAL_LOGS_KEY);
  }
}
