import {Component} from '@angular/core';
import {AbstractControl, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {CPUs, GPUs} from "../../../_constants/hardware";
import {SystemRequirements} from "../../../_entities/hardware";

@Component({
  selector: 'app-task2-a',
  templateUrl: './task2-a.component.html',
  styleUrls: ['./task2-a.component.less'],
  standalone: false
})
export class Task2AComponent {
  readonly game = 'DOOM: The Dark Ages';

  readonly CPUs = CPUs;
  readonly GPUs = GPUs;

  readonly systemReqForm;

  constructor(private fb: NonNullableFormBuilder) {
    this.systemReqForm = this.fb.group({
      cpu: [CPUs[0].name, [Validators.required, this.cpuValidator(14500)]],
      gpu: [GPUs[0].name, [Validators.required, this.gpuValidator(8)]],
      supportsRayTracing: [false, [Validators.requiredTrue]],
      memory: [16, [Validators.required, Validators.min(16)]],
      storage: [512, [Validators.required, Validators.min(100)]],
    }, {
      updateOn: 'submit',
      validators: this.gpuWithRayTracingValidator(4)
    });
  }

  private cpuValidator(minScore: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cpu = CPUs.find(cpu => cpu.name === control.value);
      if (!cpu) {
        return {invalidCpu: true};
      }

      if (cpu.score < minScore) {
        return {insufficientCpu: {minScore}};
      }

      return null;
    }
  }

  private gpuValidator(minVRAM: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const gpu = GPUs.find(gpu => gpu.name === control.value);
      if (!gpu) {
        return {invalidGpu: true};
      }

      if (gpu.vramGB < minVRAM) {
        return {insufficientGpu: {minVRAM}};
      }

      return null;
    }
  }

  private gpuWithRayTracingValidator(minVRAM: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const gpuName = control.get('gpu');
      if (!gpuName) {
        return {invalidGpu: true};
      }
      const gpu = GPUs.find(gpu => gpu.name === gpuName.value);
      if (!gpu) {
        return {invalidGpu: true};
      }

      const supportsRayTracing = control.get('supportsRayTracing')!.value;

      if (supportsRayTracing && gpu.vramGB < minVRAM) {
        return {invalidGpuWithRayTracing: true};
      }

      return null;
    }
  }

  onSubmit() {
    if (this.systemReqForm.valid) {
      alert(`A megadott rendszer specifikációk megfelelnek a ${this.game} minimális rendszerkövetelményeinek.`);
    } else {
      Object.values(this.systemReqForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }

  getTagColorFromScore(score: number): 'red' | 'gold' | 'geekblue' {
    const minScore = CPUs.reduce((min, cpu) =>
      Math.min(min, cpu.score), CPUs[0].score);
    const maxScore = CPUs.reduce((max, cpu) =>
      Math.max(max, cpu.score), CPUs[0].score);
    const step = (maxScore - minScore) / 3;
    switch (true) {
      case score <= minScore + step:
        return 'red';
      case score <= minScore + 2 * step:
        return 'gold';
      default:
        return 'geekblue';
    }
  }
}
