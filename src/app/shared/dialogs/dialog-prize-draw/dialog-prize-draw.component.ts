import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-prize-draw',
  templateUrl: './dialog-prize-draw.component.html',
  styleUrls: ['./dialog-prize-draw.component.scss']
})
export class DialogPrizeDrawComponent {

  public form: FormGroup;
  public loading: boolean = false;
  public prizeDrawId: number;
  public participants: any[] = [];
  public visibleParticipants: any[] = [];
  public translateX: number = 0;
  public winner: any = null;

  private intervalId: any;
  private currentSpeed: number = 0;
  private readonly maxSpeed: number = 150;
  private readonly acceleration: number = 2;
  private readonly totalDuration: number = 10000;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected readonly _data: any,
    private readonly dialogRef: MatDialogRef<DialogPrizeDrawComponent>,
    private readonly _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this._data) {
      this.prizeDrawId = this._data.id;
      this.participants = Object.values(this._data.participants)
        .filter((participant: any) => !participant.admin)
        .map((participant: any) => ({
          id: participant.id,
          name: participant.name || '',
          phone: participant.id.split('@')[0],
          imgUrl: participant.imgUrl || '/assets/images/trevo.jpg',
          admin: participant.admin || null
        }));
      
      // Tornar a lista cíclica
      this.visibleParticipants = [...this.participants, ...this.participants];
    }
  }

  public onCancel(): void {
    this.dialogRef.close(false);
  }

  public onConfirm(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.form.getRawValue());
  }

  public startRoulette(): void {
    if (this.participants.length === 0) {
      return;
    }
  
    // Embaralhar participantes antes de iniciar o sorteio
    this.shuffleParticipants();
  
    this.reset();
  
    this.loading = true;
    this.currentSpeed = 1; // Velocidade inicial
    const maxScroll = this.visibleParticipants.length * 160;
  
    const intervalDuration = 50;
  
    this.intervalId = setInterval(() => {
      // Aumentar velocidade até atingir o máximo
      if (this.currentSpeed < this.maxSpeed) {
        this.currentSpeed += this.acceleration;
      }
  
      this.translateX -= this.currentSpeed;
  
      // Resetar para criar efeito de lista cíclica
      if (Math.abs(this.translateX) >= maxScroll / 2) {
        this.translateX = 0;
      }
  
      // Parar roleta após o tempo total
      if (elapsedTime >= this.totalDuration) {
        this.stopRoulette();
      }
    }, intervalDuration);
  
    let elapsedTime = 0; // Tempo total para controlar o sorteio
    const elapsedInterval = setInterval(() => {
      elapsedTime += intervalDuration;
  
      if (elapsedTime >= this.totalDuration) {
        clearInterval(elapsedInterval);
        this.stopRoulette();
      }
    }, intervalDuration);
  }
  
  
  private stopRoulette(): void {
    clearInterval(this.intervalId);
  
    // Determinar o índice do vencedor com base no centro
    const cardWidth = 160; // Largura de cada card
    const containerWidth = 800; // Largura visível do container (5 cards visíveis)
    const centerOffset = (containerWidth / 2) - (cardWidth / 2); // Posição central exata
  
    const winnerIndex = Math.floor((Math.abs(this.translateX) + centerOffset) / cardWidth) % this.participants.length;
    this.winner = this.participants[winnerIndex];
  
    // Calcular o deslocamento necessário para centralizar o vencedor
    const finalOffset = -(winnerIndex * cardWidth) + centerOffset;
    const currentOffset = this.translateX;
    const distance = finalOffset - currentOffset;
  
    const totalSteps = 50; // Número de passos na animação
    let step = 0;
  
    const animationInterval = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      this.translateX = currentOffset + progress * distance;
  
      if (step >= totalSteps) {
        clearInterval(animationInterval);
  
        // Após o sorteio, resetar os participantes
        this.shuffleParticipants();
        this.translateX = 0; // Resetar posição
        this.loading = false; // Permitir novo sorteio
      }
    }, 20); // Intervalo de cada passo na animação
  }
  
  // Função para embaralhar os participantes
  private shuffleParticipants(): void {
    this.participants = this.participants
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  
    // Tornar a lista cíclica novamente
    this.visibleParticipants = [...this.participants, ...this.participants];
  }
  
  reset(){
    setTimeout(() => {
      this.translateX = 0; // Resetar posição
      this.winner = null; // Limpar vencedor
      this.loading = false; // Permitir novo sorteio
    }, 2000); // Tempo para exibir o vencedor
  }

}
