import * as moment from 'moment'
import { NgPluralizeService } from 'ng-pluralize';
import { isObject, isArray } from '../helpers/helpers'
import { ApiService } from "../services/api.service";

export abstract class BaseModel {

    abstract dates: any
    abstract relations: any
    static api: ApiService;
    static pluralizeService: NgPluralizeService

    // TODO: maybe try to get this working eventually, for now we'll just duplicate methods
    //       on derived model classes
    // static async find(id: string): Promise<any>
    // {
    //   const resource = this.name.toLowerCase()
    //   const hasCompanyId = this.toString().includes('this.company_id = null;')
    //   const response = await this.api.get(this.pluralizeService.pluralize(resource), id, hasCompanyId)
    //   const modelFile = await import(`./${resource}.model`)
    //   const modelClass = modelFile[resource.charAt(0).toUpperCase() + resource.slice(1)]

    //   return new modelClass(response.data[resource])
    // }

    map(data: any) 
    {
        this._mapProperties(data);
        this._mapRelations(data);
        this._mapDates(data);
    }

    private _mapProperties(attributes: any)
    {
        Object.keys(this).forEach(key => {
            // If key is a relation, skip here.
            if (key === 'relations' || key === 'dates' || this.relations[key] || this.dates[key] || !attributes)
            {
                return;
            } 

            this[key] = attributes[key];
        });  
    }

    private _mapRelations(attributes: any)
    {
        for (let relation in this.relations)
        {
            // Relation is a single object
            if (isObject(attributes[relation]))
            {
                this[relation] = new this.relations[relation](attributes[relation])
            }

            // Relation is an array of objects
            if (isArray(attributes[relation]) && isArray)
            {
                this[relation] = attributes[relation]
                    .map((obj: any, index: number) => {
                        return new this.relations[relation](attributes[relation][index]);
                    });
            }
        }    
    }

    private _mapDates(attributes: any)
    {
        if (! this.hasOwnProperty('dates')) return;

        for (let dateKey in this.dates)
        {
            this[dateKey] = moment(attributes[dateKey]).toDate()
        }
    }
}
