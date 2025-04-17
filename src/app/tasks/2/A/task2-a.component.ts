import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CPUs, GPUs, systemReqs} from "../../../_constants/hardware";
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

  readonly systemReqForm = new FormGroup({
    cpu: new FormControl(CPUs[0].name),
    gpu: new FormControl(GPUs[0].name),
    supportsRayTracing: new FormControl(false),
    memory: new FormControl(16),
    storage: new FormControl(512),
  });

  constructor() {
  }

  onSubmit() {
    const cpuName = this.systemReqForm.get('cpu')?.value;
    const cpu = this.CPUs.find(cpu => cpu.name === cpuName);
    const gpuName = this.systemReqForm.get('gpu')?.value;
    const gpu = this.GPUs.find(gpu => gpu.name === gpuName);
    const supportsRayTracing = this.systemReqForm.get('supportsRayTracing')?.value;
    const memory = this.systemReqForm.get('memory')?.value;
    const storage = this.systemReqForm.get('storage')?.value;

    const passesReqs = this.checkReqs(systemReqs[this.game], {
      cpuScore: cpu?.score || 0,
      vramGB: gpu?.vramGB || 0,
      memoryGB: memory || 0,
      storageGB: storage || 0,
    })

    alert(`A megadott hardverek ${!passesReqs ? 'nem felelnek meg' : 'megfelelnek'} ` +
      `a ${this.game} minimum rendszerkövetelményeinek.`);
  }

  private checkReqs(reqs: SystemRequirements, specs: SystemRequirements,) {
    return specs.cpuScore >= reqs.cpuScore &&
      specs.vramGB >= reqs.vramGB &&
      specs.memoryGB >= reqs.memoryGB &&
      specs.storageGB >= reqs.storageGB;
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
