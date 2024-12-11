import { NgModule } from '@angular/core'; // Asegúrate de tener esta importación
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
/* import { HttpClientModule } from '@angular/common/http'; */

@NgModule({
    imports: [
        MatTableModule,
        MatCardModule,
        MatButtonModule,
/*         HttpClientModule, */
    ],
    exports: [
        MatTableModule,
        MatCardModule,
        MatButtonModule,
    ]
})
export class YourModule { } // Asegúrate de que la clase tenga un nombre adecuado
