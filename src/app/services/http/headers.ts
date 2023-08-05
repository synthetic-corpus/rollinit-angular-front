import { HttpHeaders } from "@angular/common/http";

export const CORS = {headers: new HttpHeaders({
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'no-store'
})}
