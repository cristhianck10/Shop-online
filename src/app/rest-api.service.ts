import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Producto } from './interfaces/producto';
import { Usuario } from './interfaces/usuario';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrlProducto = "http://localhost/server_api/producto_api.php"; //get
const apiUrlUsuario = "http://localhost/server_api/usuario_api.php"; //get and post
const apiCompra = "http://localhost/server_api/compra_api.php"; //get and post

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(
    private http: HttpClient) { }

    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError('Something bad happened; please try again later.');
    }
    
    private extractData(res: Response) {
      let body = res;
      return body || { };
    }

    //Opbtener la lista de productos
    getProducto(): Observable<any> {
      return this.http.get(apiUrlProducto, httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError));
    }

    //Obtener solo un producto
    getProductoById(id: string): Observable<any> {
      const url = `${apiUrlProducto}?id=${id}`;
      return this.http.get(url, httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError));
    }

    getProductoCategoria(id: string){
      const url = `${apiUrlProducto}?id_pr=${id}`;
      
      return this.http.get(url, httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError));
    }
    //Traer la categoria
    getCategoria(id: string){
      const url = `${apiUrlProducto}?id_c=${id}`;
      
      return this.http.get(url, httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError));
    }
    //Obtener Usuario
    getUsuarioById(nick: string, pass: string, body): Observable<any> {
      const url = `${apiUrlUsuario}?nick=${nick}&pass=${pass}`;
      return this.http.post(url, JSON.stringify(body) ,httpOptions)
    }
    //Crear Usuario
    createUsuario(body){
      return this.http.post(apiUrlUsuario,JSON.stringify(body),httpOptions).pipe(
        catchError(this.handleError)
      );
    }
    


}


