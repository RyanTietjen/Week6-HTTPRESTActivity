
import { Request, Response } from 'express';
import { CalculatorModel } from '../../models/calculator.model';
import { ICalculatorModel, RequestBody } from '../../interfaces';
import { ActionKeys, NumericKeys, OperatorKeys } from '../../enums';

export class CalculatorController {

  private static calculatorModel: ICalculatorModel = new CalculatorModel();

  public static getHandler(req: Request, res: Response): void {
    res.status(200).json(CalculatorController.calculatorModel.display());
  }

  public static postHandler(req: Request<RequestBody>, res: Response<string>): void {
    const body: RequestBody = req.body;
    switch (body.operationType) {
      case 'NumericKeys':
        CalculatorController.calculatorModel.pressNumericKey(<NumericKeys>body.value);
        res.status(200).json(CalculatorController.calculatorModel.display());
        break;
      case 'OperatorKeys':
        CalculatorController.calculatorModel.pressOperatorKey(<OperatorKeys>body.value);
        res.status(200).json(CalculatorController.calculatorModel.display());
        break;
      case 'ActionKeys':
        CalculatorController.calculatorModel.pressActionKey(<ActionKeys>body.value);
        res.status(200).json(CalculatorController.calculatorModel.display());
        break;
      default:
        res.status(500).json('ERR');
        return;
    }
  }

  public static allHandler(req: Request, res: Response): void {
    res.status(404).json('Not Found');
  }

}
