import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl = 'https://frontend-cwdpc4gsgyfna2g5.z02.azurefd.net/documents';

  constructor(private http: HttpClient) { }

  // Upload file
  uploadFile(file: File, claimId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/upload/${claimId}`, formData, { responseType: 'text' });
  }

  // Download file
  downloadFile(blobName: string): Observable<Blob> {
    const params = new HttpParams().set('blobName', blobName);
    return this.http.get(`${this.baseUrl}/download`, { params, responseType: 'blob' });
  }

  // Delete file
  deleteFile(blobName: string): Observable<any> {
    const params = new HttpParams().set('blobName', blobName);
    return this.http.delete(`${this.baseUrl}/delete`, { params, responseType: 'text' });
  }

  // Get blob URL
  getFileUrl(blobName: string): Observable<string> {
    const params = new HttpParams().set('blobName', blobName);
    return this.http.get(`${this.baseUrl}/url`, { params, responseType: 'text' });
  }
}
