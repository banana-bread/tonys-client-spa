import * as moment from 'moment';

export abstract class BaseModel {

    abstract dates: any;   

    map(data: any) 
    {

        // this._mapProperties(data);
        // this._mapRelations(data);
        // TODO: improve
        // this._mapBaseSchedule();

        Object.keys(this).forEach(key => {
            if (key === 'dates' || this.dates[key]) return;

            this[key] = data[key];
        });

        this._mapDates(data);
    }

    private _mapDates(attributes: any)
    {
        if (! this.hasOwnProperty('dates')) return;

        for (let dateKey in this.dates)
        {
            this[dateKey] = moment(attributes[dateKey]).toDate()
        }
    }
    
    // private _mapProperties(attributes: any)
    // {
    //     Object.keys(this).forEach(key => {
    //         // If key is a relation, skip here.
    //         if (key === 'relations' || key === 'dates' || this.relations[key] || this.dates[key])
    //         {
    //             return;
    //         } 

    //         this[key] = attributes[key];
    //     });  
    // }

    // // TODO: should check that relation is of type array
    // private _mapRelations(attributes: any)
    // {
    //     for (let relation in this.relations)
    //     {
    //         // Relation is a single object
    //         if (isObject(attributes[relation]))
    //         {
    //             this[relation] = new this.relations[relation](attributes[relation])
    //         }

    //         // Relation is an array of objects
    //         if (isArray(attributes[relation]) && isArray)
    //         {
    //             this[relation] = attributes[relation]
    //                 .map((obj: any, index: number) => {
    //                     return new this.relations[relation](attributes[relation][index]);
    //                 });
    //         }
    //     }    
    // }
}